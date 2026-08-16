import { useCallback, useEffect, useRef, useState } from 'react';
import uuid from 'react-native-uuid';
import { ChatMessage } from '../types';
import { sendMessageToGemini, GeminiApiError } from '../services/geminiService';
import { loadChatHistory, saveChatHistory, clearChatHistory } from '../services/storageService';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  // Load persisted history on mount
  useEffect(() => {
    (async () => {
      const history = await loadChatHistory();
      setMessages(history);
      setIsLoadingHistory(false);
      hasLoadedRef.current = true;
    })();
  }, []);

  // Persist any time messages change (after initial load)
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    saveChatHistory(messages);
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setErrorBanner(null);

      const userMessage: ChatMessage = {
        id: uuid.v4() as string,
        role: 'user',
        text: trimmed,
        timestamp: Date.now(),
      };

      const nextHistory = [...messages, userMessage];
      setMessages(nextHistory);
      setIsSending(true);

      try {
        const replyText = await sendMessageToGemini(nextHistory);
        const modelMessage: ChatMessage = {
          id: uuid.v4() as string,
          role: 'model',
          text: replyText,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, modelMessage]);
      } catch (err) {
        const message =
          err instanceof GeminiApiError
            ? err.message
            : 'Something went wrong. Please try again.';
        setErrorBanner(message);
        // Add a visible error bubble so the failure is tied to the message in-context
        setMessages((prev) => [
          ...prev,
          {
            id: uuid.v4() as string,
            role: 'model',
            text: message,
            timestamp: Date.now(),
            error: true,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending]
  );

  const resetChat = useCallback(async () => {
    await clearChatHistory();
    setMessages([]);
    setErrorBanner(null);
  }, []);

  return {
    messages,
    isSending,
    isLoadingHistory,
    errorBanner,
    sendMessage,
    resetChat,
  };
}
