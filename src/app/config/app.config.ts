
declare global {
  interface Window {
    env: {
      apiUrl: string;
    };
  }
}

export const APP_CONFIG = {
  apiUrl: window.env?.apiUrl || 'http://localhost:8080'
};

export {};