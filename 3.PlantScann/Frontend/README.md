# PlantScann Frontend

Diagnóstico Agrícola Inteligente

Este proyecto es una aplicación móvil desarrollada con React Native y Expo, diseñada para diagnosticar el estado de plantas a partir de fotografías. Permite tomar fotos o seleccionar imágenes desde la galería, enviarlas a una API para su análisis y mostrar resultados detallados sobre la planta.

## Características principales

- **Captura de fotos**: Usa la cámara del dispositivo para tomar fotos de plantas.
- **Selección desde galería**: Permite elegir imágenes existentes del dispositivo.
- **Reducción automática de tamaño/calidad**: Las fotos tomadas se comprimen y redimensionan automáticamente para evitar errores de carga.
- **Envío a API**: Las imágenes se envían a un backend para su análisis.
- **Visualización de resultados**: Muestra tipo de planta, nivel de maduración, enfermedades, necesidades nutricionales, tiempo desde siembra y fecha tentativa de cosecha.
- **Permisos**: Solicita permisos de cámara y galería de forma amigable.
- **UI adaptable**: Interfaz responsiva para móviles y tablets.

## Estructura del proyecto

```
app.json
App.tsx
index.ts
package.json
tsconfig.json
app/
  (tabs)/
    index.tsx         # Pantalla principal y lógica de cámara/fotos
assets/
  images/            # Imágenes y recursos
src/
  components/        # Componentes reutilizables
  screens/           # Pantallas adicionales (HomeScreen, PhotoPreviewScreen)
  services/          # Servicios (ej: llamadas a API)
  utils/             # Utilidades (ej: uploadImage)
```

## Instalación y ejecución

1. **Clona el repositorio**

```sh
git clone <url-del-repo>
cd Frontend
```

2. **Instala dependencias**

```sh
npm install
```

3. **Instala dependencias nativas de Expo**

```sh
npx expo install expo-camera expo-image-picker expo-image-manipulator
```

4. **Inicia el proyecto**

```sh
npx expo start
```

Escanea el QR con Expo Go en tu dispositivo móvil.

## Uso

- Pulsa "Tomar Foto" para abrir la cámara y tomar una foto.
- Pulsa "Seleccionar desde galería" para elegir una imagen existente.
- La imagen se enviará automáticamente a la API y se mostrarán los resultados.
- Puedes tomar otra foto usando el botón "Tomar otra foto".

## Configuración de la API

La URL de la API está definida en `app/(tabs)/index.tsx`:

```
const axiosResponse = await axios.post('http://192.162.0.56:5000/upload', formData, ...)
```

Asegúrate de que la API esté corriendo y accesible desde tu dispositivo.

## Permisos

La app solicita permisos de cámara y galería. En iOS, los mensajes de permisos están definidos en `appConfig`:

```
NSCameraUsageDescription: "Esta app necesita acceso a la cámara para tomar fotos de plantas."
NSPhotoLibraryUsageDescription: "Esta app necesita acceso a la galería para seleccionar imágenes."
```

## Dependencias principales

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [expo-image-manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)
- [axios](https://axios-http.com/)

## Notas técnicas

- La previsualización en vivo de la cámara solo es posible con expo-camera y CameraView, pero la captura de fotos en Expo Go se realiza usando expo-image-picker para máxima compatibilidad.
- Las imágenes tomadas con la cámara se comprimen y redimensionan automáticamente antes de enviarse a la API para evitar errores 413 (Payload Too Large).
- El backend debe aceptar imágenes en un campo llamado `image` como multipart/form-data.

## Personalización

- Puedes modificar la UI y los estilos en `app/(tabs)/index.tsx`.
- Para cambiar la lógica de envío o el endpoint, edita la función `sendPhoto`.
- Para agregar nuevas pantallas, usa la carpeta `src/screens/`.

## Licencia

MIT

---

Desarrollado por el equipo de PlantScann.
