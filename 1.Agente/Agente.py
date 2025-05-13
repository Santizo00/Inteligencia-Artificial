import sounddevice as sd
import numpy as np
import time
import random
import threading
import sys
import subprocess
import os
import signal

# Historial de sonido y variables de estado
historial_volumen = []
tamaño_historial = 50
estado_actual = "normal"
hablando = False
tiempo_inicio_habla = 0
TIEMPO_MAX_HABLA = 8  # Máximo tiempo que puede durar un mensaje hablado
proceso_habla_actual = None

# Parámetros de control
TIEMPO_ENFRIAMIENTO_SUSTO = 4.0  # Segundos de enfriamiento entre sustos
TIEMPO_ENTRE_CHISTES = 9.0      # Segundos entre chistes normales
ultimo_susto = 0                 # Timestamp del último susto
ultimo_chiste = 0                # Timestamp del último chiste

# Reacciones del agente
reacciones_normal = [
    "¿Sabes por qué los pájaros no usan Facebook? ¡Porque ya tienen Twitter!",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
    "¿Qué hace un pez en el agua? ¡Nada!",
    "¿Qué hace una computadora en la playa? ¡Surfear la web!",
    "¿Por qué el libro de matemáticas estaba triste? Porque tenía muchos problemas.",
    "¿Qué le dice un jaguar a otro? Jaguar you.",
    "¿Cómo se llama el campeón de buceo japonés? Tokofondo."
]

reacciones_susto = [
    "¡¡¡AAAHHH!!! ¡¿QUÉ FUE ESO?! ¡Casi me da un infarto!",
    "¡Me asustaste! Pero bueno, al menos no estoy solo."
]

def hablar_con_powershell(texto):
    """Usa PowerShell para hablar (solo Windows)"""
    comando = f'powershell -command "Add-Type -AssemblyName System.Speech; ' \
              f'$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ' \
              f'$speak.Rate = 1; $speak.Speak(\'{texto}\');"'
    return subprocess.Popen(comando, shell=True, creationflags=subprocess.CREATE_NEW_PROCESS_GROUP)

def hablar_con_say(texto):
    """Usa el comando say para hablar (solo macOS)"""
    return subprocess.Popen(["say", texto])

def hablar_con_espeak(texto):
    """Usa espeak para hablar (Linux y posiblemente otros)"""
    return subprocess.Popen(["espeak", "-v", "es", texto])

def detectar_sistema():
    """Detecta qué sistema operativo estamos usando"""
    if sys.platform.startswith('win'):
        return 'windows'
    elif sys.platform.startswith('darwin'):
        return 'macos'
    else:
        return 'linux'

# Determinar qué función de habla usar según el sistema operativo
sistema = detectar_sistema()
if sistema == 'windows':
    hablar_sistema = hablar_con_powershell
elif sistema == 'macos':
    hablar_sistema = hablar_con_say
else:
    hablar_sistema = hablar_con_espeak

def detener_proceso(proceso):
    """Detiene un proceso de manera forzada según el sistema operativo"""
    if proceso is None:
        return
        
    try:
        if sistema == 'windows':
            # En Windows, enviamos Ctrl+C al grupo de procesos
            os.kill(proceso.pid, signal.CTRL_BREAK_EVENT)
            # También terminamos el proceso directamente
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(proceso.pid)])
        else:
            # En Unix (Linux/macOS), usamos SIGKILL para terminar forzosamente
            os.killpg(os.getpgid(proceso.pid), signal.SIGKILL)
            proceso.kill()
        
        # Esperar brevemente a que termine
        proceso.wait(timeout=0.5)
    except Exception as e:
        print(f"No se pudo detener el proceso: {e}")
        # Intento más agresivo
        try:
            proceso.kill()
        except:
            pass

def hablar(mensaje, es_susto=False):
    """Habla un mensaje, interrumpiendo cualquier habla en curso si es necesario"""
    global hablando, tiempo_inicio_habla, proceso_habla_actual
    
    # Si hay un susto y estamos hablando, interrumpir el habla actual
    if es_susto and hablando and proceso_habla_actual:
        print(f"⚠️ Interrumpiendo habla para susto: '{mensaje}'")
        
        # Forzar detención del proceso actual
        detener_proceso(proceso_habla_actual)
        proceso_habla_actual = None
        
        # Pequeña pausa para asegurar que el audio se haya detenido
        time.sleep(0.2)
        
        # Marcar como no hablando para permitir la nueva habla
        hablando = False
    
    # Si no estamos hablando o es un susto, iniciar nueva habla
    if not hablando or es_susto:
        print(f"🔊 HABLANDO: {mensaje}")
        hablando = True
        tiempo_inicio_habla = time.time()
        
        # Iniciar proceso de habla
        proceso_habla_actual = hablar_sistema(mensaje)
        
        # Iniciar un hilo para monitorear cuándo termina la habla
        def monitorear_habla():
            try:
                proceso_habla_actual.wait()
            except:
                pass  # El proceso podría haber sido terminado
            global hablando
            hablando = False
            print("✓ Mensaje completado o interrumpido")
        
        monitor = threading.Thread(target=monitorear_habla)
        monitor.daemon = True
        monitor.start()

def calcular_umbral_susto():
    """Calcula el umbral para el susto basándose en el historial."""
    if len(historial_volumen) < 10:
        return 0.1  # Valor inicial mientras recolectamos datos

    # Calculamos el percentil 90 para definir el umbral de susto
    percentil_90 = np.percentile(historial_volumen, 90)
    return max(percentil_90 * 1.5, 0.05)  # Factor 1.5 para evitar falsos positivos

def comprobar_habla_bloqueada():
    """Comprueba si el habla se ha quedado bloqueada y la reinicia"""
    global hablando, tiempo_inicio_habla, proceso_habla_actual
    
    tiempo_actual = time.time()
    if hablando and (tiempo_actual - tiempo_inicio_habla) > TIEMPO_MAX_HABLA:
        print("⚠️ Detectado bloqueo en el habla, reiniciando...")
        detener_proceso(proceso_habla_actual)
        proceso_habla_actual = None
        hablando = False
        return True
    return False

def detectar_ruido():
    """Función que analiza el sonido en tiempo real y reacciona adecuadamente."""
    global estado_actual, historial_volumen
    global ultimo_susto, ultimo_chiste, proceso_habla_actual
    
    # Inicializar timestamps para forzar un primer chiste pronto
    ultimo_susto = time.time() - TIEMPO_ENFRIAMIENTO_SUSTO - 1
    ultimo_chiste = time.time() - TIEMPO_ENTRE_CHISTES + 2  # Primer chiste después de 2 segundos
    
    try:
        with sd.InputStream(samplerate=44100, channels=1) as stream:
            while True:
                # Leer el sonido actual
                indata, _ = stream.read(1024)
                volumen = np.linalg.norm(indata)
                
                # Agregar al historial y mantener tamaño
                historial_volumen.append(volumen)
                if len(historial_volumen) > tamaño_historial:
                    historial_volumen.pop(0)
                
                # Calcular umbral dinámicamente
                UMBRAL_SUSTO = calcular_umbral_susto()
                tiempo_actual = time.time()
                
                # Comprobar si el habla está bloqueada
                comprobar_habla_bloqueada()
                
                # Determinar si es un susto (considerando enfriamiento)
                potencial_susto = volumen > UMBRAL_SUSTO
                tiempo_desde_ultimo_susto = tiempo_actual - ultimo_susto
                enfriamiento_activo = tiempo_desde_ultimo_susto < TIEMPO_ENFRIAMIENTO_SUSTO
                
                # Verificar tiempo para chiste
                tiempo_para_chiste = tiempo_actual - ultimo_chiste > TIEMPO_ENTRE_CHISTES
                
                # Estado para mostrar
                if potencial_susto:
                    estado_mostrar = "🚨SUSTO!"
                elif enfriamiento_activo:
                    estado_mostrar = "🧊ENFRIANDO"
                elif hablando:
                    tiempo_hablando = int(tiempo_actual - tiempo_inicio_habla)
                    estado_mostrar = f"🗣️HABLANDO ({tiempo_hablando}s)"
                elif tiempo_para_chiste:
                    estado_mostrar = "💬LISTO PARA CHISTE"
                else:
                    tiempo_restante = int(TIEMPO_ENTRE_CHISTES-(tiempo_actual-ultimo_chiste))
                    estado_mostrar = f"😌NORMAL ({tiempo_restante}s)"
                
                print(f"🔊 Nivel: {volumen:.5f} | Umbral: {UMBRAL_SUSTO:.5f} | {estado_mostrar}")
                
                # CASO 1: Susto detectado y no estamos en enfriamiento
                if potencial_susto and not enfriamiento_activo:
                    hablar(random.choice(reacciones_susto), es_susto=True)
                    ultimo_susto = tiempo_actual
                    ultimo_chiste = tiempo_actual  # Reiniciar temporizador de chistes
                    estado_actual = "susto"
                
                # CASO 2: Normalidad - decir chiste si ha pasado suficiente tiempo y no estamos hablando
                elif not hablando and tiempo_para_chiste:
                    chiste = random.choice(reacciones_normal)
                    hablar(chiste)
                    ultimo_chiste = tiempo_actual
                    estado_actual = "normal"
                
                # Si no hay susto, mantener estado normal
                elif not potencial_susto:
                    estado_actual = "normal"
                
                time.sleep(0.1)  # Ajustar para mayor responsividad
                
    except KeyboardInterrupt:
        print("\nDeteniendo el agente...")
    except Exception as e:
        print(f"Error en detección: {e}")
        print(f"Detalles: {type(e).__name__}")
        import traceback
        traceback.print_exc()

# Verificar que el sintetizador del sistema funciona
def verificar_sintetizador():
    try:
        print(f"Verificando sintetizador de voz ({sistema})...")
        proceso = hablar_sistema("Sistema iniciado")
        proceso.wait(timeout=5)
        if proceso.returncode == 0 or proceso.returncode is None:
            print("✓ Sintetizador verificado correctamente")
            return True
        else:
            print(f"❌ El sintetizador devolvió código de error: {proceso.returncode}")
            return False
    except Exception as e:
        print(f"❌ Error al verificar el sintetizador: {e}")
        return False

# Función principal
def main():
    # Iniciar la detección de sonido
    print(f"🎤 Agente Detector de Ruido Activo - Configuración:")
    print(f"⏱️ Tiempo entre chistes: {TIEMPO_ENTRE_CHISTES} segundos")
    print(f"❄️ Enfriamiento tras susto: {TIEMPO_ENFRIAMIENTO_SUSTO} segundos")
    print(f"⚠️ Protección de bloqueo: {TIEMPO_MAX_HABLA} segundos")
    print(f"💻 Sistema operativo detectado: {sistema}")
    print("💡 Presiona Ctrl+C para salir")
    
    # Verificar sintetizador antes de empezar
    if not verificar_sintetizador():
        print("\nNo se pudo verificar el sintetizador de voz.")
        print("En Windows: Asegúrate de ejecutar como administrador")
        print("En Linux: Instala espeak con 'sudo apt-get install espeak'")
        print("En macOS: El comando 'say' debería estar disponible por defecto")
        return
    
    try:
        detectar_ruido()
    except KeyboardInterrupt:
        print("\nDetención solicitada por usuario.")
        detener_proceso(proceso_habla_actual)
    except Exception as e:
        print(f"Error fatal: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Limpieza final
        detener_proceso(proceso_habla_actual)
        print("Agente finalizado correctamente.")

# Código de entrada
if __name__ == "__main__":
    main()