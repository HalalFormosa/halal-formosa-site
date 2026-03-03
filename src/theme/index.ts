import { computed, ref, watch } from "vue";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "halal-formosa-theme";

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
};

export const theme = ref<ThemeMode>(getInitialTheme());

export const isDarkTheme = computed(() => theme.value === "dark");

export const setTheme = (nextTheme: ThemeMode) => {
  theme.value = nextTheme;
};

export const toggleTheme = () => {
  setTheme(theme.value === "dark" ? "light" : "dark");
};

watch(
  theme,
  (nextTheme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.style.colorScheme = nextTheme;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    }
  },
  { immediate: true }
);
