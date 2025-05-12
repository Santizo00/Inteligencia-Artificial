# 🌿 PlantScann – Sistema de Diagnóstico Agrícola Inteligente

**PlantScann** es un sistema ligero y funcional basado en inteligencia artificial multimodal que permite analizar imágenes de cultivos, frutas o plantas para ofrecer un diagnóstico agrícola automatizado.

---

## 🚀 Características principales

✅ Clasificación del tipo de planta o cultivo  
✅ Evaluación del nivel de maduración  
✅ Detección de enfermedades visibles  
✅ Estimación de necesidades nutricionales  
✅ Cálculo de tiempo desde la siembra  
✅ Proyección de fecha tentativa de cosecha  
✅ Compatible con cualquier dispositivo en red local  

---

## 🧠 Tecnologías utilizadas

| Componente | Tecnología                                      |
|------------|---------------------------------------------    |
| Backend    | Python + Flask                                  |
| IA         | Google Gemini 2.0 Flash (`google-generativeai`) |
| Frontend   | HTML + JS simple (sin framework)                |
| Otros      | Pillow, Dotenv, Flask-CORS                      |

---

## 📁 Estructura del proyecto

PlantScann/
├── Backend/
│ ├── app.py           # API principal Flask
│ ├── gemini_api.py    # Conexión con modelo Gemini
│ ├── .env             # Variables de entorno (clave API)
│ └── requirements.txt # Dependencias de Python
├── Frontend/
│ └── index.html       # Interfaz web simple para cargar imagen


---

## ⚙️ Instalación y ejecución

### 1. Clonar repositorio

-bash
git clone https://github.com/Santizo00/Inteligencia-Artificial.git
cd PlantScann/Backend

### 2. Crear entorno virtual

python -m venv venv
venv\Scripts\activate  # En Windows
# source venv/bin/activate  # En Linux/macOS

### 3. Instalar dependencias

pip install -r requirements.txt


### 4. Crear archivo .env 

GEMINI_API_KEY=TU_CLAVE_API_DE_GOOGLE

▶️ Ejecutar servidor
python app.py

📦 Ejemplo de respuesta JSON
{
  "tipo_planta": "Tomate",
  "nivel_maduracion": "Intermedio",
  "enfermedades_visibles": "Manchas por hongos",
  "necesidades_nutricionales": "Posible deficiencia de nitrógeno",
  "tiempo_estimado_desde_siembra": "5 semanas",
  "fecha_tentativa_cosecha": "En aproximadamente 3 semanas"
}

🛡 Seguridad y notas
Este sistema está diseñado para uso local / pruebas educativas.

No compartas tu clave de API públicamente.

El modelo gemini-2.0-flash es gratuito hasta cierto límite de uso en Google AI Studio.
