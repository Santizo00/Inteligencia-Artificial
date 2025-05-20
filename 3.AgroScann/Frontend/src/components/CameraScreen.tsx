import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  onPhotoTaken: (uri: string) => void;
  onCancel: () => void;
}

export default function CameraScreen({ onPhotoTaken, onCancel }: Props) {
  useEffect(() => {
    (async () => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.5,
        base64: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selected = result.assets[0];
        onPhotoTaken(selected.uri);
      } else {
        onCancel(); // Si se cancela, notificar al padre para cerrar la vista
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Abriendo cámara...</Text>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
  },
});
