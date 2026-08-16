export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  error?: boolean;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}
