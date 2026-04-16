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

export const toggleTheme = (event?: MouseEvent) => {
  const isAppearanceTransition =
    typeof document !== "undefined" &&
    // @ts-ignore
    document.startViewTransition &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    setTheme(theme.value === "dark" ? "light" : "dark");
    return;
  }

  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // @ts-ignore
  const transition = document.startViewTransition(async () => {
    setTheme(theme.value === "dark" ? "light" : "dark");
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: theme.value === "dark" ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: theme.value === "dark" ? "::view-transition-old(root)" : "::view-transition-new(root)",
      }
    );
  });
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
