export const ARTICLES_API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://backend.valescooil.com/api');
