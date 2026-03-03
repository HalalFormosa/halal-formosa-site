import { ref, watch } from "vue";
import en from "@/locales/en.json";
import zhTw from "@/locales/zh-tw.json";

export type SupportedLocale = "en" | "zh-tw";

type MessageTree = Record<string, unknown>;

const FALLBACK_LOCALE: SupportedLocale = "en";
const STORAGE_KEY = "halal-formosa-locale";

const messages: Record<SupportedLocale, MessageTree> = {
  en,
  "zh-tw": zhTw,
};

const normalizeLocale = (value?: string | null): SupportedLocale | null => {
  if (!value) return null;

  const normalized = value.toLowerCase().replace("_", "-");
  if (normalized.startsWith("zh")) return "zh-tw";
  if (normalized.startsWith("en")) return "en";

  return null;
};

const detectInitialLocale = (): SupportedLocale => {
  if (typeof window === "undefined") return FALLBACK_LOCALE;

  const stored = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  if (stored) return stored;

  const candidate = window.navigator.languages
    .map((language) => normalizeLocale(language))
    .find((language): language is SupportedLocale => Boolean(language));

  return candidate ?? FALLBACK_LOCALE;
};

const resolvePath = (tree: MessageTree, path: string): unknown => {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (typeof acc !== "object" || acc === null) return undefined;
    return (acc as Record<string, unknown>)[segment];
  }, tree);
};

export const locale = ref<SupportedLocale>(detectInitialLocale());

export const setLocale = (nextLocale: SupportedLocale) => {
  locale.value = nextLocale;
};

watch(
  locale,
  (nextLocale) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLocale;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  },
  { immediate: true }
);

export const t = (path: string): string => {
  const currentValue = resolvePath(messages[locale.value], path);
  if (typeof currentValue === "string") return currentValue;

  const fallbackValue = resolvePath(messages[FALLBACK_LOCALE], path);
  if (typeof fallbackValue === "string") return fallbackValue;

  return path;
};

export const getMessage = <T>(path: string, fallback: T): T => {
  const currentValue = resolvePath(messages[locale.value], path);
  if (currentValue !== undefined) return currentValue as T;

  const fallbackValue = resolvePath(messages[FALLBACK_LOCALE], path);
  if (fallbackValue !== undefined) return fallbackValue as T;

  return fallback;
};
