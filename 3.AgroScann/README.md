# 🌿 AgroScann – Sistema de Diagnóstico Agrícola Inteligente

**AgroScann** es un sistema multiplataforma basado en inteligencia artificial multimodal que permite analizar imágenes de cultivos, frutas o plantas para ofrecer un diagnóstico agrícola automatizado. Además, incluye un chat interactivo que permite hacer preguntas sobre el cultivo analizado, incluyendo recomendaciones agrícolas, tiempos de cosecha, nutrición, control de plagas y más.

---

## 🚀 Características principales

✅ Clasificación del tipo de planta o cultivo  
✅ Evaluación del nivel de maduración  
✅ Detección de enfermedades visibles  
✅ Estimación de necesidades nutricionales  
✅ Cálculo de tiempo desde la siembra  
✅ Proyección de fecha tentativa de cosecha  
✅ Chat inteligente sobre el cultivo analizado (basado en contexto)  
✅ Interfaz web o aplicación móvil con cámara integrada  
✅ Compatible con red local para entornos rurales sin internet  

---

## 🧠 Tecnologías utilizadas

| Componente   | Tecnología                                      |
|--------------|-------------------------------------------------|
| Backend      | Python + Flask                                  |
| IA           | Google Gemini 2.0 Flash (`google-generativeai`) |
| Frontend Web | HTML + JS                                       |
| App Móvil    | React Native + Expo                             |
| Otros        | Pillow, Dotenv, Flask-CORS, Axios               |

---

## 📁 Estructura del proyecto

AgroScann/
├── Backend/
│ ├── app.py              # API principal Flask
│ ├── gemini_api.py       # Lógica de análisis y preguntas con Gemini
│ ├── .env                # Clave de API Gemini
│ └── requirements.txt    # Dependencias
├── Frontend/             # Aplicación móvil con Expo
│ ├── assets/             # Recursos gráficos (logo, íconos, granjero)
│ ├── src/
│ │ ├── components/       # CameraScreen.tsx, ChatBox.tsx
│ │ ├── screens/          # HomeScreen.tsx, PhotoPreviewScreen.tsx
│ │ ├── navigation/       # AppNavigator.tsx
│ │ └── utils/            # uploadImage.ts
│ ├── App.tsx
│ ├── app.json
│ └── package.json


---

## ⚙️ Instalación y ejecución

Para ejecutar el chatbot, asegúrate de tener Python 3 instalado en tu sistema. Luego, sigue estos sencillos pasos:

  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Santizo00/Inteligencia-Artificial.git
    cd Inteligencia-artificial/3.AgroScann
    ```

### 1. Instalar dependencias(Backend) y Ejecución Backend (Flask)

**cd Inteligencia-Artificial/3.AgroScann/Backend**

*Crea entorno virtual*
- python -m venv venv
- venv\Scripts\activate  # En Windows

*Instala dependencias*
- pip install -r requirements.txt

*Crear archivo .env* 
- GEMINI_API_KEY=TU_CLAVE_API_DE_GOOGLE

*Ejecutar servidor*
- python app.py


### 2. Instalar dependencias(Frontend) y Ejecución Frontend

**cd Inteligencia-Artificial/3.AgroScann/Frontend**

*Instala dependencias*
- npm install


*Ejecutar la app Móvil*
- npx expo start

*Ejecutar la app Móvil y Web*
- npm start


### 📦 Ejemplo de respuesta JSON

{
  "tipo_planta": "Tomate",
  "nivel_maduracion": "Intermedio",
  "enfermedades_visibles": "Manchas por hongos",
  "necesidades_nutricionales": "Posible deficiencia de nitrógeno",
  "tiempo_estimado_desde_siembra": "5 semanas",
  "fecha_tentativa_cosecha": "En aproximadamente 3 semanas"
}

### 🧪 Chat interactivo
Una vez analizada la planta, el sistema te permite hacer preguntas como:

- ¿Cada cuánto la riego?

- ¿Qué fertilizante aplico?

- ¿Qué precio tiene esta cosecha?

- ¿Cuánto falta para la cosecha?

- ¿Cómo tratar estas manchas en las hojas?

La IA responde en español, con base en el diagnóstico y el historial de la conversación.


### 📌 Permisos
La app Expo solicita automáticamente los permisos de:

- Cámara (expo-camera)

- Galería (expo-image-picker)

### 📦 Dependencias principales

**🔙 Backend (Python + Flask)**
- Flask: Microframework para crear la API (flask, flask-cors)

- python-dotenv: Para cargar la clave API desde .env

- Pillow: Manipulación de imágenes (from PIL import Image)

- google-generativeai: SDK oficial para acceder a modelos Gemini (gemini-2.0-pro o gemini-2.0-flash)

- re, json, io: Módulos estándar para limpieza y análisis del contenido generado

*Instalación vía requirements.txt*

**📱 Frontend (React Native + Expo)**
- react-native: Framework base para móviles

- expo: CLI y herramientas de desarrollo móvil

- expo-camera: Permite capturar imágenes desde la app

- expo-image-picker: Para seleccionar imágenes desde galería o cámara (modo simplificado)

- @react-navigation/native: Sistema de navegación entre pantallas

- @react-navigation/native-stack: Navegación tipo stack (ideal para flujo cámara → preview)

- axios: Cliente HTTP para enviar imágenes y hacer preguntas al backend

- react-native-safe-area-context: Manejo seguro de márgenes y barras en dispositivos móviles

- react-native-screens: Mejor rendimiento en navegación

- typescript, @types/react: Soporte tipado

*Instalación vía package.json*


### ✅ Notas técnicas
Las imágenes se envían como multipart/form-data al backend en el campo image.

El chat mantiene un historial para mejorar la calidad de las respuestas.

Las respuestas del modelo se adaptan al diagnóstico actual.

Toda la lógica de envío y carga está en uploadImage.ts.

### 🛡 Seguridad
Este sistema fue creado con fines educativos y para demostraciones.

El modelo gemini-2.0-flash es gratuito dentro de los límites de uso de Google AI Studio.

No compartas tu API key públicamente.

Desarrollado con 💚 por el equipo de AgroScann
