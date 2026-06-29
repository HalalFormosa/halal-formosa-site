<script setup lang="ts">
import { t } from "@/i18n";
</script>

<template>
  <!-- Final CTA Section -->
  <section id="download" class="bg-gradient-to-r from-[#d97b1a] to-[#bf6c16] text-white py-20">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">{{ t("finalCta.title") }}</h2>
      <p class="text-xl mb-8 text-orange-50">
        {{ t("finalCta.subtitle") }}
      </p>

      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">

        <!-- APP STORE -->
        <a
            href="https://apps.apple.com/tw/app/halal-formosa-halal-taiwan/id6771660859"
            target="_blank"
            rel="noopener noreferrer"
            class="w-40 block"
        >
          <img
              src="/app-store.png"
              :alt="t('finalCta.appStoreAlt')"
              class="w-full cursor-pointer hover:opacity-80 transition"
          />
        </a>

        <!-- GOOGLE PLAY (LIVE DOWNLOAD) -->
        <a
            href="https://play.google.com/store/apps/details?id=com.rcreative.halalformosa"
            target="_blank"
            rel="noopener noreferrer"
            class="w-40 block"
        >
          <img
              src="/google-play.png"
              :alt="t('finalCta.googlePlayAlt')"
              class="w-full cursor-pointer hover:opacity-80 transition"
          />
        </a>

        <!-- WEB VERSION BADGE -->
        <a
            href="https://app.halalformosa.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-40 block"
        >
          <img
              src="/web-badge.png"
              :alt="t('finalCta.webAlt')"
              class="w-full cursor-pointer hover:opacity-80 transition"
          />
        </a>

      </div>

    </div>
  </section>
</template>

<style scoped></style>
