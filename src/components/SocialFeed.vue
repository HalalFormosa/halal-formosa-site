<script setup lang="ts">
import { onMounted } from "vue";
import { t } from "@/i18n";

const SCRIPT_SRC = "https://elfsightcdn.com/platform.js";

onMounted(() => {
  // Load Elfsight platform only once (SPA-safe).
  if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">
        {{ t("social.title") }}
      </h2>

      <p class="text-slate-600 mb-8">
        {{ t("social.subtitle") }}
      </p>

      <!-- FOLLOW BUTTONS -->
      <div class="flex justify-center gap-4 mb-10 flex-wrap">
        <!-- Instagram -->
        <a
            href="https://www.instagram.com/halalformosa"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3
           rounded-full bg-gradient-to-r from-pink-500 to-orange-400
           text-white font-semibold hover:opacity-90 transition"
        >
          <ion-icon name="logo-instagram" class="text-xl"></ion-icon>
          {{ t("common.instagram") }}
        </a>

        <!-- TikTok -->
        <a
            href="https://www.tiktok.com/@halal_formosa"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3
           rounded-full bg-black
           text-white font-semibold hover:opacity-90 transition"
        >
          <ion-icon name="logo-tiktok" class="text-xl"></ion-icon>
          {{ t("common.tiktok") }}
        </a>
      </div>


      <!-- Elfsight Social Feed -->
      <div
          class="elfsight-app-5271181b-7ce0-401b-b8ea-5c9eb0c592d0"
          data-elfsight-app-lazy
      ></div>
    </div>
  </section>
</template>
