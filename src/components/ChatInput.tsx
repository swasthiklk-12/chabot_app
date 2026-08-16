import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Props {
  onSend: (text: string) => void;
  isSending: boolean;
}

export default function ChatInput({ onSend, isSending }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || isSending) return;
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Message Gemini..."
        placeholderTextColor="#9CA3AF"
        multiline
        maxLength={4000}
        editable={!isSending}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!text.trim() || isSending) && styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!text.trim() || isSending}
      >
        {isSending ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.sendButtonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 64,
  },
  sendButtonDisabled: {
    backgroundColor: '#C7D2FE',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
