import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage } from '../types';

const STORAGE_KEY = '@gemini_chat_history';

export async function loadChatHistory(): Promise<ChatMessage[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatMessage[];
  } catch (err) {
    console.warn('Failed to load chat history:', err);
    return [];
  }
}

export async function saveChatHistory(messages: ChatMessage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (err) {
    console.warn('Failed to save chat history:', err);
  }
}

export async function clearChatHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear chat history:', err);
  }
}
