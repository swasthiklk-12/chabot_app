// ⚠️ Gemini API key & model config.
// Get a free key at: https://aistudio.google.com/app/apikey
//
// The key is read from an environment variable (EXPO_PUBLIC_GEMINI_API_KEY)
// instead of being hardcoded, so it's not committed to git and can be set
// per-environment (local .env file, or your host's env var settings).
//
// NOTE: Any EXPO_PUBLIC_* variable is bundled into the client-side JS and
// is visible to anyone who inspects the app/web bundle — this is fine for
// local development/testing, but do NOT rely on this alone for a real
// production deployment. For production, proxy requests through your own
// backend server that holds the key secretly instead.
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

// Model options: 'gemini-3.5-flash' (fast, cheap) or 'gemini-3-pro' (higher quality)
export const GEMINI_MODEL = 'gemini-3.5-flash-lite';