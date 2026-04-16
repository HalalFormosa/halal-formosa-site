<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import { locale, setLocale, t, type SupportedLocale } from "@/i18n";
import { isDarkTheme, toggleTheme } from "@/theme";
import { Languages } from "lucide-vue-next";

const router = useRouter();
const mobileOpen = ref(false);

const localeOptions: Array<{ value: SupportedLocale; labelKey: string }> = [
  { value: "en", labelKey: "header.languages.en" },
  { value: "zh-tw", labelKey: "header.languages.zh-tw" },
];



const goToHomeSection = async (sectionId: string) => {
  if (router.currentRoute.value.path !== "/") {
    await router.push("/");
  }

  requestAnimationFrame(() => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  });
};

const goHome = () => router.push("/");

const setLanguage = (language: SupportedLocale) => {
  setLocale(language);
};

const handleLocaleChange = (event: Event) => {
  const selectedLocale = (event.target as HTMLSelectElement).value as SupportedLocale;
  setLocale(selectedLocale);
};
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2 cursor-pointer" @click="goHome">
        <img :src="logo" class="w-10 h-10 rounded-lg object-contain" />
        <span class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ t("common.brand") }}</span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <button @click="goToHomeSection('features')" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.features") }}</button>
        <button @click="goToHomeSection('pricing')" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.pricing") }}</button>
        <button @click="goToHomeSection('testimonials')" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.testimonials") }}</button>

        <router-link to="/about" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.about") }}</router-link>
        <router-link to="/news" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.news") }}</router-link>
        <router-link to="/faq" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.faq") }}</router-link>
        <router-link to="/contact" class="text-slate-600 dark:text-slate-300 hover:text-[#d97b1a] transition">{{ t("header.nav.contact") }}</router-link>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <div class="relative group">
          <button
            type="button"
            class="p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 inline-flex items-center hover:border-[#d97b1a] hover:text-[#d97b1a] transition"
            :aria-label="t('header.languageLabel')"
          >
            <Languages class="w-5 h-5" />
          </button>

          <div
            class="absolute right-0 top-full pt-1 w-44 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
          >
            <div class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-1">
            <button
              v-for="option in localeOptions"
              :key="option.value"
              type="button"
              @click="setLanguage(option.value)"
              class="w-full text-left px-3 py-2 rounded-md text-sm transition inline-flex items-center justify-between"
              :class="option.value === locale ? 'bg-orange-50 dark:bg-orange-900/30 text-[#d97b1a] font-medium' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              <span>{{ t(option.labelKey) }}</span>
              <span v-if="option.value === locale" class="text-[#d97b1a]">✓</span>
            </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="toggleTheme($event)"
          class="p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 inline-flex items-center hover:border-[#d97b1a] hover:text-[#d97b1a] transition"
          :aria-label="isDarkTheme ? t('header.themeLight') : t('header.themeDark')"
        >
          <svg v-if="isDarkTheme" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36-.7-.7M6.34 6.34l-.7-.7m12.72 0-.7.7M6.34 17.66l-.7.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>

        <button
          @click="goToHomeSection('download')"
          class="px-6 py-2 bg-[#d97b1a] text-white rounded-lg font-medium hover:bg-[#bf6c16] transition"
        >
          {{ t("common.download") }}
        </button>
      </div>

      <button class="md:hidden p-2 text-slate-700 dark:text-slate-200" @click="mobileOpen = !mobileOpen">
        <svg v-if="!mobileOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <transition name="slide">
      <div v-if="mobileOpen" class="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-4">
        <button @click="goToHomeSection('features'); mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.features") }}
        </button>

        <button @click="goToHomeSection('pricing'); mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.pricing") }}
        </button>

        <button @click="goToHomeSection('testimonials'); mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.testimonials") }}
        </button>

        <router-link to="/about" @click="mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.about") }}
        </router-link>

        <router-link to="/news" @click="mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.news") }}
        </router-link>

        <router-link to="/faq" @click="mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.faq") }}
        </router-link>

        <router-link to="/contact" @click="mobileOpen=false" class="block w-full text-left text-slate-700 dark:text-slate-200 font-medium py-2 hover:text-[#d97b1a] transition">
          {{ t("header.nav.contact") }}
        </router-link>

        <div class="flex items-center justify-between gap-3 py-2">
          <span class="text-slate-700 dark:text-slate-200 font-medium">{{ t("header.languageLabel") }}</span>
          <select
            :value="locale"
            class="px-2 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            @change="handleLocaleChange"
          >
            <option value="en">{{ t("header.languages.en") }}</option>
            <option value="zh-tw">{{ t("header.languages.zh-tw") }}</option>
          </select>
        </div>

        <button
          type="button"
          @click="toggleTheme($event)"
          class="w-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 rounded-lg font-medium inline-flex items-center justify-center gap-2"
        >
          <svg v-if="isDarkTheme" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36-.7-.7M6.34 6.34l-.7-.7m12.72 0-.7.7M6.34 17.66l-.7.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
          {{ isDarkTheme ? t("header.themeLight") : t("header.themeDark") }}
        </button>

        <button
          @click="goToHomeSection('download'); mobileOpen=false"
          class="w-full bg-[#d97b1a] text-white py-2 rounded-lg font-semibold"
        >
          {{ t("common.download") }}
        </button>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-from { opacity: 0; transform: translateY(-6px); }
.slide-enter-to { opacity: 1; transform: translateY(0); }
.slide-enter-active { transition: all 0.2s ease-out; }
.slide-leave-active { transition: all 0.15s ease-in; opacity: 0; transform: translateY(-6px); }
</style>
