import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uploadImage, DiagnosticoAgricola } from '../utils/uploadImage';
import ChatBox from '../components/ChatBox';

type Props = {
  route: RouteProp<RootStackParamList, 'PhotoPreview'>;
};

export default function PhotoPreviewScreen({ route }: Props) {
  const { imageUri } = route.params;
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState<DiagnosticoAgricola | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const navigation = useNavigation();
  const chatBoxRef = useRef<any>(null);

  useEffect(() => {
    const analyze = async () => {
      const result = await uploadImage(imageUri);
      setResponseData(result);
      setLoading(false);
    };
    analyze();
  }, [imageUri]);

  useEffect(() => {
    if (showChat && chatBoxRef.current && chatBoxRef.current.scrollToEnd) {
      setTimeout(() => {
        chatBoxRef.current.scrollToEnd();
      }, 100);
    }
  }, [showChat]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo1.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Imagen */}
          <View style={styles.card}>
            <Image
              source={{ uri: imageUri }}
              style={styles.imagePreview}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
            {imageError && (
              <Text style={{ color: 'red', marginTop: 4 }}>No se pudo cargar la imagen.</Text>
            )}
          </View>

          {/* Botón y Chat debajo de la imagen */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => setShowChat(!showChat)}
            >
              <Text style={styles.chatText}>
                {showChat ? '🔽 Cerrar chat' : '💬 Chat'}
              </Text>
            </TouchableOpacity>
            {showChat && (
              <View style={styles.chatWrapper}>
                <ChatBox ref={chatBoxRef} messages={chatMessages} setMessages={setChatMessages} />
              </View>
            )}
          </View>

          {/* Descripción y resultado */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Imagen Analisada</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
            ) : responseData ? (
              <View style={styles.resultCard}>
                <Text><Text style={styles.label}>🌿 Planta:</Text> {responseData.tipo_planta}</Text>
                <Text><Text style={styles.label}>📈 Maduración:</Text> {responseData.nivel_maduracion}</Text>
                <Text><Text style={styles.label}>🦠 Enfermedades:</Text> {responseData.enfermedades_visibles}</Text>
                <Text><Text style={styles.label}>💧 Nutrición:</Text> {responseData.necesidades_nutricionales}</Text>
                <Text><Text style={styles.label}>⏱ Desde siembra:</Text> {responseData.tiempo_estimado_desde_siembra}</Text>
                <Text><Text style={styles.label}>📅 Cosecha:</Text> {responseData.fecha_tentativa_cosecha}</Text>
              </View>
            ) : (
              <Text style={{ marginTop: 20, color: 'red' }}>No se pudo analizar la imagen.</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  chatWrapper: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    marginTop: 16,
    zIndex: 999,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  logoContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    height: 240,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
    elevation: 4,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingBottom: 0,
    zIndex: 1000,
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  chatText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  scrollContainer: {
    paddingBottom: 30,
    flexGrow: 1,
  },
});
