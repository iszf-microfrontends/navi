declare global {
  /**
   * Custom utility types
   */
  export type Nullable<T> = T | null;

  /**
   * Predefined constants
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  export const __DEV__: boolean;

  /**
   * NodeJS types
   */
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      PORT?: number;
      PREVIEW_PORT?: number;
      APP_NAME?: string;
      DOMAIN?: string;
      MCS_URL?: string;
      BACKEND_URL?: string;
      BACKEND_NAME?: string;
    }
  }
}

export {};
