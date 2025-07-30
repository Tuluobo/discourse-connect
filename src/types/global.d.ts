// types/global.d.ts
declare global {
  const EdgeRuntime: string | undefined;
  interface Window {
    __ENV__?: {
      NEXT_PUBLIC_HOST_URL?: string;
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_UMAMI_SCRIPT?: string;
      NEXT_PUBLIC_UMAMI_WEBSITE_ID?: string;
    };
  }
}

export {};
