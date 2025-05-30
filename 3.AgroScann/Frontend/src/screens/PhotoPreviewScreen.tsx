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
import { preguntarPlanta } from '../utils/preguntarPlanta';
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

  const handleSendPregunta = async (pregunta: string) => {
    if (!responseData) return;
    // Construir historial para enviar al backend
    const historial = chatMessages
      .filter((msg) => msg.from === 'user' || msg.from === 'bot')
      .map((msg) =>
        msg.from === 'user'
          ? { usuario: msg.text, respuesta: '' }
          : { usuario: '', respuesta: msg.text }
      );
    // Unir pares usuario-respuesta
    const historialPares = [];
    for (let i = 0; i < historial.length; i += 2) {
      if (historial[i] && historial[i + 1]) {
        historialPares.push({
          usuario: historial[i].usuario,
          respuesta: historial[i + 1].respuesta,
        });
      }
    }
    setChatMessages((prev: any[]) => [
      ...prev,
      { id: Date.now().toString(), from: 'user', text: pregunta },
    ]);
    const respuesta = await preguntarPlanta({
      pregunta,
      contexto: responseData,
      historial: historialPares,
    });
    setChatMessages((prev: any[]) => [
      ...prev,
      {
        id: Date.now().toString() + '-bot',
        from: 'bot',
        text: respuesta || 'Error al obtener respuesta del asistente.',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Overlay de chat y botón, fuera del container, en primer plano */}
      {showChat && (
        <View style={styles.overlayFullScreen} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.overlayChatButton}
            onPress={() => setShowChat(false)}
          >
            <Text style={styles.chatText}>🔽 Cerrar chat</Text>
          </TouchableOpacity>
          <View style={styles.overlayChatWrapper}>
            <ChatBox
              ref={chatBoxRef}
              messages={chatMessages}
              setMessages={setChatMessages}
              onSendPregunta={handleSendPregunta}
            />
          </View>
        </View>
      )}
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

          {/* Descripción y resultado */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Imagen Analizada</Text>

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

            {/* Botón de chat en la parte inferior de la descripción */}
            {!showChat && (
              <View style={{ alignItems: 'center', marginTop: 24 }}>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => setShowChat(true)}
                >
                  <Text style={styles.chatText}>💬 Chat</Text>
                </TouchableOpacity>
              </View>
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
  overlayFullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 10,
  },
  overlayChatWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayChatButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    elevation: 3,
    borderColor: '#ddd',
    borderWidth: 1,
    zIndex: 30,
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
});
