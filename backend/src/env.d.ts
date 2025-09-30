declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_PASSWORD: string;
      PORT?: string;
    }
  }
}
export {};