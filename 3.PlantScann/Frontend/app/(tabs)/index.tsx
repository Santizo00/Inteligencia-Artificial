import React, { useRef, useState } from 'react';
import { useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ActivityIndicator, Image as RNImage, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Button } from 'react-native';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const hasPermission = permission && permission.granted;

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.3, // reduce calidad
      base64: false,
    });
    if (!result.canceled && result.assets.length > 0) {
      let selected = result.assets[0];
      // Redimensionar si es muy grande
      let manipulated = selected;
      if (selected.width > 1024) {
        const manipResult = await ImageManipulator.manipulateAsync(
          selected.uri,
          [{ resize: { width: 1024 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        manipulated = { ...selected, uri: manipResult.uri };
      }
      setPhoto(manipulated.uri);
      sendPhoto(manipulated.uri);
      setCameraOpen(false);
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
      // Detecta el tipo mime
      const fileType = uri.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'photo.jpg',
        type: fileType,
      } as any);
      const axiosResponse = await axios.post('http://192.162.0.56:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(axiosResponse.data.resultado);
    } catch (error) {
      console.error(error);
      setResult({ error: 'Error enviando la imagen o recibiendo respuesta.' });
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return <View style={styles.permissionContainer}><Text>Solicitando permisos...</Text></View>;
  }
  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>Necesitamos tu permiso para mostrar la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Diagnóstico Agrícola Inteligente</Text>
      <View style={[styles.mainRow, isMobile && styles.mainRowMobile]}>
        <View style={[styles.leftColumn, isMobile && styles.leftColumnMobile]}>
          {photo ? (
            <>
              <RNImage source={{ uri: photo }} style={styles.image} resizeMode="contain" />
              <TouchableOpacity style={styles.button} onPress={() => { setPhoto(null); setResult(null); setCameraOpen(true); }}>
                <Text style={styles.buttonText}>Tomar otra foto</Text>
              </TouchableOpacity>
            </>
          ) : cameraOpen ? (
            <View style={styles.camera}>
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                  <Text style={styles.buttonText}>Tomar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(false)}>
                  <Text style={styles.buttonText}>Cerrar cámara</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.buttonGroup, isMobile && styles.buttonGroupMobile]}>
              <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)}>
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={[styles.buttonText, styles.buttonTextCenter]}>Seleccionar desde galería</Text>
              </TouchableOpacity>
            </View>
          )}
          {loading && <ActivityIndicator size="large" style={{ margin: 20 }} color="#388E3C" />}
        </View>
        <View style={[styles.rightColumn, isMobile && styles.rightColumnMobile]}>
          <View style={[styles.cardsGrid, isMobile && styles.cardsGridMobile]}>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Tipo de Planta</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.tipo_planta : '-'}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Nivel de maduración</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.nivel_maduracion : '-'}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Enfermedades visibles</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.enfermedades_visibles : '-'}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Necesidades nutricionales</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.necesidades_nutricionales : '-'}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Tiempo desde siembra</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.tiempo_estimado_desde_siembra : '-'}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Fecha tentativa de cosecha</Text>
              <Text style={styles.cardValue}>{result && !result.error ? result.fecha_tentativa_cosecha : '-'}</Text>
            </View>
          </View>
          {result && result.error && (
            <View style={styles.resultContainer}>
              <Text style={styles.errorText}>{result.error}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 40,
    marginTop: 20,
  },
  mainRowMobile: {
    flexDirection: 'column',
    gap: 0,
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 400,
  },
  leftColumnMobile: {
    width: '100%',
    minWidth: undefined,
    maxWidth: undefined,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonGroupMobile: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  rightColumn: {
    flex: 2,
    minWidth: 350,
    maxWidth: 600,
    alignItems: 'center',
  },
  rightColumnMobile: {
    width: '100%',
    minWidth: undefined,
    maxWidth: undefined,
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderImage: {
    width: 300,
    height: 300,
    backgroundColor: '#C8E6C9',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#388E3C',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 20,
  },
  cardsGridMobile: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 10,
  },
  infoCard: {
    backgroundColor: '#F1FFF6',
    borderRadius: 14,
    borderTopWidth: 5,
    borderTopColor: '#43A047',
    padding: 18,
    margin: 8,
    width: 200,
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '40%',
    minHeight: 80,
  },
  cardLabel: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardValue: {
    color: '#1B5E20',
    fontSize: 14,
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: 170,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#1B5E20',
    letterSpacing: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#388E3C',
  },
  camera: {
    width: 300,
    height: 400,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#388E3C',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    padding: 10,
    gap: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#43A047',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#43A047',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 0,
    marginHorizontal: 5,
    minWidth: 90,
    alignItems: 'center',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  buttonTextCenter: {
    textAlign: 'center',
    width: '100%',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    width: '100%',
  },
  errorText: {
    color: '#C62828',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionMessage: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#1B5E20',
    fontSize: 16,
  },
});

const appConfig = {
  expo: {
    ios: {
      infoPlist: {
        NSCameraUsageDescription: "Esta app necesita acceso a la cámara para tomar fotos de plantas.",
        NSPhotoLibraryUsageDescription: "Esta app necesita acceso a la galería para seleccionar imágenes."
      }
    }
  }
};
