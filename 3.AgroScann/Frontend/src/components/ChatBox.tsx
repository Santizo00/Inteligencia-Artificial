import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

interface ChatBoxProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onSendPregunta?: (pregunta: string) => void;
}

const ChatBox = forwardRef((props: ChatBoxProps, ref) => {
  const { messages: externalMessages, setMessages: setExternalMessages, onSendPregunta } = props;
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    scrollToEnd: () => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    },
  }));

  // Scroll automático al enviar o recibir mensaje
  useEffect(() => {
    if (flatListRef.current && externalMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [externalMessages]);

  useEffect(() => {
    const onShow = (e: any) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
    };
    const onHide = () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    };
    const showSub = Keyboard.addListener('keyboardDidShow', onShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', onHide);
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (isKeyboardVisible) {
      // Scroll toda la pantalla hacia arriba cuando aparece el teclado
      setTimeout(() => {
        if (Platform.OS === 'android') {
          // Para Android, usar scrollTo en el contenedor principal si existe
          // Si el ChatBox está dentro de un ScrollView, deberías exponer una ref y llamarla aquí
        } else if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      }, 300);
    }
  }, [isKeyboardVisible]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (onSendPregunta) {
      onSendPregunta(trimmed);
    } else {
      setExternalMessages((prev: Message[]) => [
        ...prev,
        {
          id: Date.now().toString(),
          from: 'user',
          text: trimmed,
        },
      ]);
      setTimeout(() => {
        setExternalMessages((prev: Message[]) => [
          ...prev,
          {
            id: Date.now().toString() + '-bot',
            from: 'bot',
            text: 'Gracias por tu mensaje. Pronto te responderemos.',
          },
        ]);
      }, 800);
    }
    setInput('');
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={externalMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.from === 'user' ? styles.right : styles.left]}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        style={styles.messages}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ChatBox;

const styles = StyleSheet.create({
  wrapper: {
    height: 350,
    minHeight: 250,
    width: 320,
    maxWidth: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: -120, // Mueve el chat box aún más arriba
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    flexGrow: 1,
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  left: {
    backgroundColor: '#e1f5fe',
    alignSelf: 'flex-start',
  },
  right: {
    backgroundColor: '#dcedc8',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1, // Cambia de 210 a 1 para quitar la franja gris
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendText: {
    fontSize: 18,
    color: '#fff',
  },
});
