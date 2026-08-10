/// <reference types="astro/client" />

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    /** Definida en components/Analitica.astro */
    registrarEvento?: (nombre: string, datos?: Record<string, unknown>) => void;
  }
}

export {};
