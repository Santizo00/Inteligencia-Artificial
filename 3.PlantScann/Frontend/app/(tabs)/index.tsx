import axios from 'axios';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, Image as RNImage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' || galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photoData = await cameraRef.current.takePictureAsync({ base64: false });
      setPhoto(photoData.uri);
      setCameraOpen(false);
      sendPhoto(photoData.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      setPhoto(selected.uri);
      sendPhoto(selected.uri);
    }
  };

const sendPhoto = async (uri: string) => {
  setLoading(true);
  setResult(null);

  try {
    const blobResponse = await fetch(uri); // ⬅️ renombrado
    const blob = await blobResponse.blob();

    const file = new File([blob], 'photo.jpg', { type: blob.type });

    const formData = new FormData();
    formData.append('image', file);

    const axiosResponse = await axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Respuesta completa:', axiosResponse.data);

    setResult(axiosResponse.data.resultado);

  } catch (error) {
    console.error(error);
    setResult({ error: 'Error enviando la imagen o recibiendo respuesta.' });
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diagnóstico Agrícola Inteligente</Text>

      {photo && (
        <RNImage source={{ uri: photo }} style={styles.image} resizeMode="contain" />
      )}

      {cameraOpen ? (
        // @ts-expect-error Expo Camera type issue
        React.createElement(Camera, {
          ref: cameraRef,
          style: styles.camera,
          type: 'back',
          onCameraReady: () => setCameraReady(true),
          ratio: '4:3',
          children: (
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
            </View>
          )
        })
      ) : (
        <>
          {hasPermission && (
            <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Seleccionar desde galería</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size="large" style={{ margin: 20 }} />}

      {result && (
        <View style={styles.resultContainer}>
          {result.error ? (
            <Text style={styles.errorText}>{result.error}</Text>
          ) : (
            <>
              <Text style={styles.resultTitle}>Resultado:</Text>
              <Text>Tipo de planta: {result.tipo_planta}</Text>
              <Text>Nivel de maduración: {result.nivel_maduracion}</Text>
              <Text>Enfermedades visibles: {result.enfermedades_visibles}</Text>
              <Text>Necesidades nutricionales: {result.necesidades_nutricionales}</Text>
              <Text>Tiempo desde siembra: {result.tiempo_estimado_desde_siembra}</Text>
              <Text>Fecha tentativa de cosecha: {result.fecha_tentativa_cosecha}</Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  camera: {
    width: 300,
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#4CAF50',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    width: '100%',
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
