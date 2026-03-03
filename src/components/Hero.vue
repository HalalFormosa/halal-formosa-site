<script setup lang="ts">
import { t } from "@/i18n";
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-20 md:py-32">
    <div class="grid md:grid-cols-2 gap-12 items-center">

      <!-- LEFT SIDE -->
      <div class="text-center md:text-left">

        <h1 class="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          <span class="text-[#d97b1a]">{{ t("hero.titleHighlight") }}</span> {{ t("hero.titleSuffix") }}
        </h1>

        <p class="text-xl text-slate-600 mb-8 leading-relaxed">
          {{ t("hero.description") }}
        </p>

        <!-- STORE BADGES -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          <!-- APP STORE DISABLED -->
          <div class="relative w-40 mx-auto md:mx-0">
            <img src="/app-store.png" class="w-full opacity-80" />
            <div class="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center rounded-lg">
              <span class="text-slate-600 font-semibold text-sm">{{ t("common.iosComingSoon") }}</span>
            </div>
          </div>

          <!-- GOOGLE PLAY -->
          <a
              href="https://play.google.com/store/apps/details?id=com.rcreative.halalformosa"
              target="_blank"
              rel="noopener noreferrer"
              class="w-40 block mx-auto md:mx-0"
          >
            <img src="/google-play.png" class="w-full cursor-pointer hover:opacity-80 transition" />
          </a>

          <!-- WEB BADGE -->
          <a
              href="https://app.halalformosa.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-40 block mx-auto md:mx-0"
          >
            <img src="/web-badge.png" class="w-full cursor-pointer hover:opacity-80 transition" />
          </a>

        </div>

      </div>

      <!-- RIGHT SIDE: MOCKUP -->
      <div class="flex justify-center md:justify-end">
        <img
            src="/hero-1.png"
            :alt="t('hero.mockupAlt')"
            class="max-w-[320px] md:max-w-full drop-shadow-xl"
        />
      </div>

    </div>
  </section>
</template>
