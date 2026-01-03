// Runtime configuration utility
// This allows reading config from window.__RUNTIME_CONFIG__ with fallbacks to import.meta.env

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Record<string, string>;
    __PREVIEW_LISTENER_ATTACHED__?: boolean;
  }
}

/**
 * Get a configuration value from runtime config with fallback to build-time env var
 * This allows changing config without rebuilds by modifying public/config.js
 */
export function getRuntimeConfig(key: string): string | undefined {
  if (typeof window !== "undefined") {
    // START: Preview Mode Live Config Listener
    // Allows the parent window (Creator App) to inject config updates in real-time
    if (!window.__PREVIEW_LISTENER_ATTACHED__) {
      window.addEventListener("message", (event) => {
        if (event.data?.type === "UPDATE_CONFIG" && event.data?.config) {
          console.log("Received live preview config update", event.data.config);
          window.__RUNTIME_CONFIG__ = {
            ...window.__RUNTIME_CONFIG__,
            ...event.data.config
          };
          // Force React components to see the update (simple reload for now, or use a customized event)
          // For now, we trust that components re-reading getRuntimeConfig (hooks) might pick it up,
          // OR we force a soft refresh if needed.
          // Ideally, dispatch a custom event that components listen to.
          window.dispatchEvent(new Event("runtime-config-updated"));
        }
      });
      window.__PREVIEW_LISTENER_ATTACHED__ = true;
    }
    // END: Preview Mode Live Config Listener

    if (window.__RUNTIME_CONFIG__) {
      const value = window.__RUNTIME_CONFIG__[key];
      if (value !== undefined && value !== "") {
        return value;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const envValue = (import.meta.env as any)[key];

  if (key === "VITE_ORDERLY_BROKER_ID" && (!envValue || envValue === "")) {
    return "demo";
  }

  return envValue;
}

/**
 * Get a boolean config value with proper parsing
 */
export function getRuntimeConfigBoolean(key: string): boolean {
  const value = getRuntimeConfig(key);
  return value === "true";
}

/**
 * Get a numeric config value with proper parsing
 */
export function getRuntimeConfigNumber(
  key: string,
  defaultValue: number = 0
): number {
  const value = getRuntimeConfig(key);
  if (!value) return defaultValue;

  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Get an array config value (comma-separated)
 */
export function getRuntimeConfigArray(key: string): string[] {
  const value = getRuntimeConfig(key);
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Get parsed JSON config (for complex configurations)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRuntimeConfigJSON<T = any>(key: string): T | undefined {
  const value = getRuntimeConfig(key);
  if (!value) return undefined;

  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn(`Error parsing JSON config for ${key}:`, e);
    return undefined;
  }
}
