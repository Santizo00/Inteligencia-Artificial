from PIL import Image
from io import BytesIO
import google.generativeai as genai

def analizar_imagen_con_gemini(image_bytes: bytes) -> str:
    try:
        pil_image = Image.open(BytesIO(image_bytes))

        prompt = """
        Analiza esta imagen de una planta o cultivo y responde en formato JSON con los siguientes campos:
        {
          "tipo_planta": "",
          "nivel_maduracion": "",
          "enfermedades_visibles": "",
          "necesidades_nutricionales": "",
          "tiempo_estimado_desde_siembra": "",
          "fecha_tentativa_cosecha": ""
        }
        """

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content([prompt, pil_image])
        return response.text
    except Exception as e:
        return f"Error al analizar imagen: {e}"
