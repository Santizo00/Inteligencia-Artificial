# Inteligencia-Artificial
Repositorio con proyectos y experimentos de Inteligencia Artificial desarrollados durante el curso universitario.

Resumen del Agente Detector de Ruido
He creado un agente que detecta el sonido ambiente, cuenta chistes periódicamente, y reacciona con sobresalto ante ruidos fuertes (interrumpiendo inmediatamente cualquier chiste en progreso).
Componentes principales
1. Sistema de detección de sonido

Utiliza sounddevice para monitorear el micrófono en tiempo real
Calcula dinámicamente el umbral para detectar "sustos" basado en el historial reciente
Mantiene un registro histórico de volúmenes para adaptarse al ambiente

2. Sistema de síntesis de voz multiplataforma

Compatible con Windows, macOS y Linux
En Windows: Usa PowerShell y System.Speech
En macOS: Usa el comando nativo say
En Linux: Usa espeak
Permite interrupción inmediata del habla

3. Gestión de estados

Normal: Cuenta chistes periódicamente (cada 12 segundos)
Susto: Interrumpe todo y reproduce reacción de sorpresa
Enfriamiento: Período después de un susto para evitar reacciones en cadena
Hablando: Control del estado actual de la síntesis de voz

4. Control de interrupciones

Termina forzosamente los procesos de habla cuando ocurre un susto
Utiliza señales específicas de cada sistema operativo para garantizar que el audio se detenga
Incorpora una pequeña pausa para garantizar que no haya superposición de audio

Flujo de funcionamiento

Inicio:

Verifica el sintetizador de voz del sistema
Inicializa los parámetros y umbrales
Comienza a monitorear el sonido ambiente


Estado normal:

Cada 12 segundos cuenta un chiste aleatorio
Monitorea continuamente el nivel de sonido


Cuando detecta un susto:

Interrumpe inmediatamente cualquier chiste en progreso
Reproduce una reacción de sorpresa
Entra en período de "enfriamiento" (4 segundos)


Seguridad y monitoreo:

Detecta y recupera bloqueos en el habla (más de 8 segundos)
Visualiza el estado y nivel de sonido en tiempo real
Limpia correctamente los recursos al terminar



Características de seguridad

Sistema de "enfriamiento" para evitar reacciones múltiples ante un mismo ruido
Protección contra bloqueos del sintetizador
Manejo robusto de errores y excepciones
Limpieza adecuada de recursos al finalizar

Este agente imita perfectamente el comportamiento humano: cuando estamos hablando normalmente pero nos asustamos por un ruido fuerte, interrumpimos inmediatamente lo que estamos diciendo y reaccionamos al susto, exactamente como lo haría una persona real.
