# Chatbot Carismático con Base de Conocimiento

Este proyecto implementa un chatbot conversacional con una personalidad carismática, capaz de entender el sentimiento de tus mensajes, detectar tus intenciones y responder de manera contextual y personalizada. Se basa en una base de conocimiento definida para mantener conversaciones coherentes y atractivas.

## ¿Cómo Funciona?

El chatbot procesa tus mensajes en varias etapas para ofrecer respuestas relevantes y con un toque personal:

1.  **Análisis de Sentimiento Avanzado:** Identifica si tu mensaje tiene un tono positivo, negativo o neutro, e incluso detecta contradicciones en tus expresiones (por ejemplo, "Me gusta, pero...").
2.  **Detección de Intención Inteligente:** Clasifica tu mensaje en categorías específicas (saludos, preguntas sobre el clima, comentarios sobre tu día, etc.) utilizando patrones predefinidos y considerando el sentimiento expresado. También puede identificar preguntas directas y su tipo.
3.  **Mantenimiento de Contexto Básico:** Recuerda la respuesta anterior para responder de forma más natural a mensajes cortos como "sí", "no" o "ok".
4.  **Generación de Respuestas Carismáticas:** Elige respuestas predefinidas para cada categoría y las personaliza añadiendo tu nombre si lo mencionas, comentarios de ánimo en ciertos contextos (como el trabajo) y emojis ocasionales para darle más vida a la conversación.

## Estructura del Proyecto

El proyecto se organiza en los siguientes archivos:

* `ChatBot.py`: Contiene toda la lógica principal del chatbot, incluyendo las funciones para analizar el sentimiento, detectar la intención, mantener el contexto y generar las respuestas carismáticas.
* `corpus.py`: Define la base de conocimiento del chatbot. Incluye un diccionario de patrones de lenguaje y sus correspondientes respuestas, organizados por categorías. También contiene listas de palabras positivas y negativas utilizadas para el análisis de sentimiento.

## Librerías Utilizadas

Este proyecto utiliza las siguientes librerías estándar de Python:

* **`random`:** Se utiliza para seleccionar aleatoriamente respuestas del corpus y emojis, añadiendo variedad y un toque carismático a las interacciones.

## Instalación

Para ejecutar el chatbot, asegúrate de tener Python 3 instalado en tu sistema. Luego, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Santizo00/Inteligencia-Artificial.git
    cd Inteligencia-artificial/2.ChatBot
    ```

2.  **No se requieren dependencias externas.** El chatbot utiliza únicamente las funcionalidades estándar de Python.

## Uso

1.  **Ejecuta el chatbot:**
    ```bash
    python ChatBot.py
    ```

2.  El chatbot te saludará y te invitará a iniciar la conversación. Simplemente escribe tus mensajes en la terminal y presiona Enter.

3.  Para finalizar la conversación, escribe `salir`, `adios`, `chao` o `bye`.

## Ejemplo de Interacción

Chatbot: ¡Hola! Soy tu chatbot. Cuéntame, ¿cómo estuvo tu día? (escribe 'salir' para terminar)
Tú: Hola, hoy me fue bien, aunque tuve mucho trabajo.
Chatbot: ¡Qué bien! Me encanta escuchar que estás teniendo un buen día. ¡Espero que no estés trabajando demasiado duro! 😊
Tú: Me llamo Ana.
Chatbot: ¡Qué buen nombre, Ana!
Tú: ¿Qué puedes hacer?
Chatbot: ¡Pues soy todo un estuche de monerías! Estoy aquí para charlar, resolver dudas, acompañarte en una buena conversación o simplemente escucharte. ¿Qué te gustaría hacer hoy?
Tú: Gracias.
Chatbot: ¡No hay de qué! Es un verdadero placer poder ayudarte y conversar contigo. ¿Hay algo más en lo que pueda echarte una mano?
Tú: Adios.
Chatbot: ¡Ha sido un placer charlar contigo! Espero verte pronto por aquí de nuevo. ¡Que tengas un día fantástico!