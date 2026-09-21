/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_MEASUREMENT_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SCHEDULER_URL?: string;
  readonly VITE_PAYMENT_PROVIDER?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
