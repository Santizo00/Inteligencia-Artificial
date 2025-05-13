# Agente Detector de Ruido

Este es un agente inteligente que escucha el ambiente, cuenta chistes y se sobresalta ante ruidos fuertes, interrumpiendo cualquier chiste en curso. ¡Imita la reacción humana ante una sorpresa sonora!

## Funcionamiento

El agente opera en los siguientes estados:

1.  **Normal:** Periódicamente (cada 9 segundos por defecto), cuenta un chiste aleatorio.
2.  **Susto:** Si detecta un ruido fuerte, interrumpe inmediatamente cualquier conversación y reproduce una reacción de sorpresa.
3.  **Enfriamiento:** Después de un susto, entra en un período de 4 segundos para evitar reacciones en cadena al mismo ruido.
4.  **Hablando:** Indica que el agente está actualmente reproduciendo un mensaje de voz.

**En detalle:**

* **Detección de Sonido:** Monitorea el micrófono en tiempo real y ajusta dinámicamente la sensibilidad a los ruidos fuertes basándose en el historial reciente del volumen ambiental.
* **Síntesis de Voz Multiplataforma:** Utiliza la mejor opción de síntesis de voz disponible en tu sistema operativo:
    * **Windows:** PowerShell y `System.Speech`.
    * **macOS:** El comando nativo `say`.
    * **Linux:** `espeak`.
* **Interrupción Inteligente:** Puede detener forzosamente la reproducción de voz cuando ocurre un susto.
* **Seguridad:** Incluye un sistema de "enfriamiento" post-susto y monitoreo para evitar bloqueos en la reproducción de voz.

## Instalación

Asegúrate de tener instalado Python 3 en tu sistema. Luego, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Santizo00/Inteligencia-Artificial.git
    cd Inteligencia-Artificial/1.Agente
    ```

2.  **Instala las dependencias:**
    ```bash
    pip install sounddevice numpy
    ```
    * En **Linux**, es posible que necesites instalar `espeak`. Puedes hacerlo con:
        ```bash
        sudo apt-get install espeak
        ```

## Uso

1.  **Ejecuta el agente:**
    ```bash
    python Agente.py
    ```

2.  El agente comenzará a escuchar el sonido ambiente. Verás mensajes en la consola indicando el nivel de sonido, el estado del agente y cuándo cuenta un chiste o se asusta.

3.  Para detener el agente, simplemente presiona `Ctrl+C` en la terminal.

## Notas Adicionales

* En **Windows**, es recomendable ejecutar el script como administrador para asegurar que PowerShell pueda utilizar las funcionalidades de síntesis de voz.
* El tiempo entre chistes (actualmente 9 segundos) y el tiempo de enfriamiento (4 segundos) están definidos en el código y pueden ser ajustados si lo deseas.
* El agente muestra información en tiempo real sobre el nivel de sonido y su estado en la consola.
