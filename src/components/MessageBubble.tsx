import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../types';

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.row,
        { justifyContent: isUser ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.modelBubble,
          message.error && styles.errorBubble,
        ]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.modelText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
  },
  modelBubble: {
    backgroundColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  errorBubble: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  userText: {
    color: '#FFFFFF',
  },
  modelText: {
    color: '#111827',
  },
});
