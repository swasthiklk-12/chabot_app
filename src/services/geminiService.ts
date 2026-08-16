import { ChatMessage, GeminiContent } from '../types';
import { GEMINI_API_KEY, GEMINI_MODEL } from '../config';

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export class GeminiApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

/**
 * Converts our internal chat history into the format the Gemini API expects,
 * then sends the whole conversation so the model has context.
 */
function toGeminiContents(history: ChatMessage[]): GeminiContent[] {
  return history
    .filter((m) => !m.error)
    .map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));
}

export async function sendMessageToGemini(
  history: ChatMessage[]
): Promise<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new GeminiApiError(
      'No Gemini API key set. Add your key in src/config.ts.'
    );
  }

  const url = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: toGeminiContents(history),
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024,
    },
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    throw new GeminiApiError(
      'Network error — check your internet connection and try again.'
    );
  }

  if (!response.ok) {
    let detail = '';
    try {
      const errJson = await response.json();
      detail = errJson?.error?.message ?? '';
    } catch {
      // ignore parse failure
    }
    if (response.status === 400) {
      throw new GeminiApiError(`Bad request: ${detail || 'check your API key/model name.'}`);
    }
    if (response.status === 403) {
      throw new GeminiApiError('API key invalid or missing permissions.');
    }
    if (response.status === 429) {
      throw new GeminiApiError('Rate limit hit — please wait a moment and try again.');
    }
    throw new GeminiApiError(detail || `Request failed with status ${response.status}.`);
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    const finishReason = data?.candidates?.[0]?.finishReason;
    if (finishReason === 'SAFETY') {
      throw new GeminiApiError('Response was blocked by safety filters. Try rephrasing.');
    }
    throw new GeminiApiError('Received an empty response from Gemini.');
  }

  return text as string;
}
