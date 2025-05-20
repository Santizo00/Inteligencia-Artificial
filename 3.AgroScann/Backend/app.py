from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS
from gemini_api import analizar_imagen_con_gemini
from gemini_api import hacer_pregunta_con_gemini
import json
import re

# Cargar clave API desde .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)  # Permitir acceso desde cualquier origen
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB máximo

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        print("⚠️ No se recibió ningún archivo 'image'")
        print("Archivos recibidos:", request.files)
        return jsonify({"error": "No se envió imagen"}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()

    if not image_bytes:
        return jsonify({"error": "El archivo recibido está vacío"}), 400

    # Validar tipo MIME
    mime_type = image_file.mimetype.lower()
    if mime_type not in ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']:
        return jsonify({"error": f"Tipo de archivo no soportado: {mime_type}"}), 415

    resultado = analizar_imagen_con_gemini(image_bytes)
    print("Resultado generado por Gemini:", resultado)

    if isinstance(resultado, str):
        resultado = re.sub(r"^```json|```$", "", resultado.strip(), flags=re.MULTILINE).strip()
        try:
            resultado = json.loads(resultado)
        except json.JSONDecodeError:
            return jsonify({"error": "Respuesta de Gemini inválida"}), 500

    return jsonify({"resultado": resultado})

    
@app.route('/preguntar', methods=['POST'])
def preguntar_sobre_planta():
    data = request.get_json()

    if not data or "pregunta" not in data or "contexto" not in data:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    pregunta = data["pregunta"]
    contexto = data["contexto"]
    historial = data.get("historial", []) 

    respuesta = hacer_pregunta_con_gemini(pregunta, contexto, historial)

    return jsonify({"respuesta": respuesta})



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
