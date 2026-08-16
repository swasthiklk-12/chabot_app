import React, { useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Header from './src/components/Header';
import MessageBubble from './src/components/MessageBubble';
import TypingIndicator from './src/components/TypingIndicator';
import ChatInput from './src/components/ChatInput';
import { useChat } from './src/hooks/useChat';
import { ChatMessage } from './src/types';

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyEmoji}>💬</Text>
      <Text style={styles.emptyTitle}>Start a conversation</Text>
      <Text style={styles.emptySubtitle}>Ask Gemini anything below.</Text>
    </View>
  );
}

export default function App() {
  const { messages, isSending, isLoadingHistory, errorBanner, sendMessage, resetChat } =
    useChat();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const handleReset = () => {
    if (messages.length === 0) return;
    Alert.alert('Clear chat?', 'This will delete your entire chat history.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: resetChat },
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="light" />
        <Header onReset={handleReset} />

        {errorBanner && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorBanner}</Text>
          </View>
        )}

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {isLoadingHistory ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#4F46E5" />
            </View>
          ) : (
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MessageBubble message={item} />}
              contentContainerStyle={
                messages.length === 0 ? styles.flexGrow : styles.listContent
              }
              ListEmptyComponent={EmptyState}
              ListFooterComponent={isSending ? <TypingIndicator /> : null}
              onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            />
          )}

          <ChatInput onSend={sendMessage} isSending={isSending} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FCA5A5',
  },
  errorBannerText: {
    color: '#B91C1C',
    fontSize: 13,
  },
});
