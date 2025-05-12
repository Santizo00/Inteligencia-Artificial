from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from gemini_api import analizar_imagen_con_gemini

# Configurar clave API
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <-- esto permite que cualquier origen acceda

app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No se envió imagen"}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()

    resultado = analizar_imagen_con_gemini(image_bytes)

    return jsonify({"resultado": resultado})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
