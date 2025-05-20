import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const ChatBox = forwardRef((props: any, ref) => {
  const { messages: externalMessages, setMessages: setExternalMessages } = props;
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

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

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: trimmed,
    };

    setExternalMessages((prev: Message[]) => [...prev, newMessage]);

    // Simular respuesta del sistema
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

    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}
    >
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
    </KeyboardAvoidingView>
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
    marginTop: 0,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
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
    borderTopWidth: 1,
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
