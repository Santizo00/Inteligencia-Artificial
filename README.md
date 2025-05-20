# Repositorio de Proyectos de Inteligencia Artificial - Curso Universitario

Este repositorio contiene una colección de proyectos desarrollados como parte de un curso universitario en el área de Inteligencia Artificial. Cada proyecto explora diferentes conceptos y técnicas dentro del campo de la IA, desde agentes reactivos hasta procesamiento del lenguaje natural y visión por computadora aplicada a la agricultura.

---

## Contenido del Repositorio

### 1. Agente Detector de Ruido

* **Descripción:** 
Un agente autónomo que monitorea el sonido ambiente a través del micrófono. Reacciona a ruidos fuertes interrumpiendo cualquier acción en curso (como contar chistes periódicamente) y simula una reacción de sorpresa. Utiliza un sistema de síntesis de voz multiplataforma para comunicarse.

* **Librerías Principales:**
    * `sounddevice`: Para la captura y monitoreo de audio en tiempo real desde el micrófono.
    * `numpy`: Para el procesamiento numérico de las señales de audio, incluyendo el cálculo de la norma para determinar el volumen.
    * `time`: Para la gestión de tiempos y pausas en la ejecución del agente.
    * `random`: Para la selección aleatoria de chistes y reacciones.
    * `threading`: Para la ejecución de tareas en segundo plano, como el monitoreo de la finalización del habla.
    * `sys`: Para la detección del sistema operativo y la adaptación de la síntesis de voz.
    * `subprocess`: Para la ejecución de comandos del sistema operativo para la síntesis de voz (PowerShell en Windows, `say` en macOS, `espeak` en Linux).
    * `os` y `signal`: Para el control y la terminación forzada de los procesos de habla en diferentes sistemas operativos.

### 2. Chatbot Carismático con Base de Conocimiento

* **Descripción:** 
Un agente conversacional diseñado para interactuar con el usuario de manera carismática. Utiliza una base de conocimiento predefinida (`corpus.py`) para entender las intenciones del usuario, analizar el sentimiento de sus mensajes (incluyendo la detección de contradicciones), mantener un contexto básico y generar respuestas personalizadas con un toque humano (uso de emojis, mención del nombre del usuario).

* **Librerías Principales:**
    * `random`: Para la selección aleatoria de respuestas del corpus, saludos personalizados y emojis, añadiendo variedad y carisma a las interacciones.

### 3. AgroScann – Sistema de Diagnóstico Agrícola Inteligente

* **Descripción:** 
AgroScann es una solución inteligente y multiplataforma que combina visión por computadora e inteligencia artificial generativa para analizar imágenes de plantas, cultivos o frutas. Proporciona un diagnóstico automatizado y permite hacer preguntas interactivas relacionadas con el estado de la planta. Está diseñado para funcionar en entornos rurales, incluso sin conexión a internet pública, operando a nivel local en red privada.

* **Librerías Principales:**
    * `flask`: Framework web ligero para Python utilizado para construir la API del backend que recibe las imágenes y devuelve los diagnósticos.
    * `google-generativeai`: Librería de Google para interactuar con modelos generativos de IA como Gemini, utilizada para el análisis de las imágenes proporcionadas.
    * `Pillow` (PIL): Librería para el procesamiento de imágenes en Python, utilizada probablemente para la manipulación de las imágenes antes de enviarlas al modelo de IA.
    * `dotenv`: Para la carga de variables de entorno desde un archivo `.env`, como la clave de la API de Google Gemini, manteniendo la seguridad de la información sensible.
    * `Flask-CORS`: Extensión para Flask que maneja el Cross-Origin Resource Sharing (CORS), permitiendo que el frontend (ejecutándose en un dominio diferente o localmente) haga peticiones al backend.
    * `Expo + React Native` : Aplicación móvil con cámara integrada, interfaz amigable y chat integrado
    * `axios` : Cliente HTTP usado para enviar imágenes y preguntas
    * `expo-camera / image-picker` : Módulos Expo para tomar o seleccionar fotos desde el dispositivo

---

Este repositorio tiene como objetivo mostrar la aplicación de diversos conceptos de inteligencia artificial aprendidos durante el curso, a través de proyectos prácticos y funcionales.