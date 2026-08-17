# Gemini Chat App

A React Native (Expo) mobile chatbot that talks to Google's Gemini API. Includes:

- Chat interface with user/AI message bubbles
- Gemini API integration (`gemini-1.5-flash` by default)
- Chat history persisted locally via AsyncStorage (survives app restarts)
- Loading indicator (typing dots) while waiting for a reply
- Error handling with a dismissible-on-retry banner + inline error bubble
- Clean, responsive UI with a "Clear chat" reset

- live link:https://chabot-app1.onrender.com

## 1. Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- VS Code
- The **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)) — easiest way to test without Xcode/Android Studio
- A free Gemini API key: https://aistudio.google.com/app/apikey

## 2. Setup

Open this folder in VS Code, then in the integrated terminal:

```bash
npm install
```

Open `src/config.ts` and paste in your API key:

```ts
export const GEMINI_API_KEY = 'YOUR_ACTUAL_KEY_HERE';
```

## 3. Run it

```bash
npm start
```

This opens the Expo dev tools in your terminal/browser with a QR code.

- **On your phone:** open the Expo Go app and scan the QR code (make sure your phone and computer are on the same WiFi network).
- **iOS simulator:** press `i` in the terminal (Mac only, requires Xcode).
- **Android emulator:** press `a` in the terminal (requires Android Studio).
- **Web browser (quick preview):** press `w`.

## 4. Project structure

```
gemini-chat-app/
├── App.tsx                      # Root component — wires everything together
├── src/
│   ├── config.ts                # <-- put your Gemini API key here
│   ├── types/index.ts           # Shared TypeScript types
│   ├── services/
│   │   ├── geminiService.ts     # Calls the Gemini REST API, maps errors
│   │   └── storageService.ts    # AsyncStorage persistence for chat history
│   ├── hooks/
│   │   └── useChat.ts           # Chat state: send, load, save, error, loading
│   └── components/
│       ├── Header.tsx           # Top bar + clear chat button
│       ├── MessageBubble.tsx    # Individual chat bubble (user/model/error)
│       ├── TypingIndicator.tsx  # Animated "..." while waiting on a reply
│       └── ChatInput.tsx        # Text input + send button
```

## 5. Notes on the API key & production

`src/config.ts` hardcodes the key directly in the app for simplicity, which is
fine for local testing. **Don't ship this to an app store as-is** — anyone can
extract the key from the compiled app bundle. For a real release, add a thin
backend (e.g. a small Node/Express or Cloud Function endpoint) that holds the
key server-side, and point `geminiService.ts` at your backend instead of
calling Google directly from the phone.

## 6. Customizing

- **Model:** change `GEMINI_MODEL` in `src/config.ts` (e.g. `gemini-1.5-pro` for higher quality, slower/costlier).
- **System prompt / persona:** add a `systemInstruction` field to the request body in `geminiService.ts`.
- **Colors/branding:** all styling is in each component's `StyleSheet.create` block — no external UI library required.
