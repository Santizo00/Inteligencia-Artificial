from PIL import Image
from io import BytesIO
import json
import google.generativeai as genai

def analizar_imagen_con_gemini(image_bytes: bytes) -> str:
    try:
        pil_image = Image.open(BytesIO(image_bytes))

        prompt = """
        Analiza esta imagen y responde en español. Si la imagen corresponde a una planta, fruta, cultivo o mata, responde lo siguiente:

        {
          "tipo_planta": "<Nombre de la planta>",
          "nivel_maduracion": "<Verde, intermedio, maduro, etc.>",
          "enfermedades_visibles": "<Descripción o 'No visibles'>",
          "necesidades_nutricionales": "<Sugerencias o 'Ninguna'>",
          "tiempo_estimado_desde_siembra": "<Ej: '5 semanas'>",
          "fecha_tentativa_cosecha": "<Ej: '2 semanas'>",
          "objeto_detectado": "Planta"
        }

        Si no es una planta, fruta o cultivo, indica claramente qué objeto es y pon "No aplica" en los demás campos. Por ejemplo:

        {
          "tipo_planta": "No aplica",
          "nivel_maduracion": "No aplica",
          "enfermedades_visibles": "No aplica",
          "necesidades_nutricionales": "No aplica",
          "tiempo_estimado_desde_siembra": "No aplica",
          "fecha_tentativa_cosecha": "No aplica",
          "objeto_detectado": "Zapato"
        }

        Responde estrictamente en formato JSON sin explicación adicional.
        """

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content([prompt, pil_image])
        return response.text
    except Exception as e:
        return f"Error al analizar imagen: {e}"

def hacer_pregunta_con_gemini(pregunta: str, contexto: dict, historial: list = []) -> str:
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")

        mensajes = []

        mensajes.append(
            "Eres AgroScann, un asistente agrícola basado en IA. "
            "Responde en español latino, de forma breve, clara, útil, sin tecnicismos innecesarios. "
            "Podés responder cualquier pregunta relacionada con agricultura, plantas, frutas, suelos, plagas, fertilizantes, economía agrícola, etc. "
            "Si una pregunta **no tiene ninguna relación**, responde: '❌ Esa pregunta no tiene relación con el análisis agrícola actual.'"
        )

        mensajes.append("🌿 Diagnóstico de la planta escaneada:\n" + json.dumps(contexto, indent=2, ensure_ascii=False))

        for entrada in historial:
            mensajes.append(f"👤 Usuario: {entrada['usuario']}")
            mensajes.append(f"🌿 AgroScann: {entrada['respuesta']}")

        mensajes.append(f"👤 Usuario: {pregunta}")

        response = model.generate_content(mensajes)
        return response.text.strip()

    except Exception as e:
        return f"Error al generar respuesta: {e}"
