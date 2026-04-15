<script setup lang="ts">
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import { t } from "@/i18n";

const router = useRouter();

const goToHomeSection = async (sectionId: string) => {
  if (router.currentRoute.value.path !== "/") {
    await router.push("/");
  }

  requestAnimationFrame(() => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  });
};
</script>

<template>
  <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4 cursor-pointer" @click="router.push('/')">
            <img :src="logo" width="80" height="80" alt="Halal Formosa Logo" class="w-10 h-10 rounded-lg shadow-sm object-contain" />
            <span class="text-xl font-bold text-white">{{ t("common.brand") }}</span>
          </div>
          <p class="text-sm">{{ t("footer.tagline") }}</p>

          <!-- Launch Badges -->
          <div class="mt-6 flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <a href="https://fazier.com/launches/halal-formosa" target="_blank" rel="noopener noreferrer">
              <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=neutral" width="120" alt="Fazier badge" class="hover:opacity-80 transition" />
            </a>
            <a href="https://www.uneed.best/tool/halalformosa" target="_blank" rel="noopener noreferrer">
              <img src="https://www.uneed.best/EMBED3.png" alt="Launching Soon on Uneed" class="h-10 w-auto hover:opacity-80 transition" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">{{ t("footer.product") }}</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <button @click="goToHomeSection('features')" class="hover:text-orange-400 transition text-left">
                {{ t("header.nav.features") }}
              </button>
            </li>
            <li>
              <button @click="goToHomeSection('pricing')" class="hover:text-orange-400 transition text-left">
                {{ t("header.nav.pricing") }}
              </button>
            </li>
            <li>
              <button @click="goToHomeSection('download')" class="hover:text-orange-400 transition text-left">
                {{ t("common.download") }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">{{ t("footer.company") }}</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/about" class="hover:text-orange-400 transition">
                {{ t("header.nav.about") }}
              </router-link>
            </li>
            <li>
              <router-link to="/faq" class="hover:text-orange-400 transition">
                {{ t("header.nav.faq") }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-orange-400 transition">
                {{ t("header.nav.contact") }}
              </router-link>
            </li>
            <li>
              <router-link to="/news" class="hover:text-orange-400 transition">
                {{ t("header.nav.news") }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">{{ t("footer.connect") }}</h4>
          <div class="flex flex-col gap-3 text-sm">
            <a
              href="https://www.instagram.com/halalformosa/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-orange-400 transition"
            >
              {{ t("common.instagram") }}
            </a>

            <a
              href="https://www.tiktok.com/@halalformosa"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-orange-400 transition"
            >
              {{ t("common.tiktok") }}
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-sm text-center md:text-left">
            <p>{{ t("footer.copyright") }}</p>
            <p class="text-xs text-slate-400 mt-1">
              {{ t("footer.poweredBy") }}
              <a
                href="https://www.yiqiconsultant.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-orange-400 transition underline-offset-2 hover:underline"
              >
                YiQi Global Consulting (藝啟文創行銷有限公司)
              </a>
            </p>
          </div>

          <div class="flex gap-6 text-sm">
            <router-link to="/privacy" class="hover:text-orange-400 transition">
              {{ t("footer.privacyPolicy") }}
            </router-link>
            <router-link to="/terms" class="hover:text-orange-400 transition">
              {{ t("footer.termsOfService") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
