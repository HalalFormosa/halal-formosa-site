<template>
  <section class="max-w-4xl mx-auto px-6 py-24">
    <h1 class="text-4xl font-bold text-slate-900 text-center mb-6">{{ t("contactPage.title") }}</h1>

    <p class="text-slate-600 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
      {{ t("contactPage.subtitle") }}
    </p>

    <div
      v-if="route.query.success"
      class="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center"
    >
      {{ t("contactPage.successMessage") }}
    </div>

    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-6">{{ t("contactPage.reachUs") }}</h2>

      <div class="flex justify-start gap-4 mb-10 flex-wrap">
        <a
          href="https://www.instagram.com/halalformosa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90 transition"
        >
          <Instagram class="w-5 h-5" />
          {{ t("common.instagram") }}
        </a>

        <a
          href="https://www.tiktok.com/@halal_formosa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition"
        >
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.25 1.45 3.58 1.52.01 1.25.01 2.5 0 3.75-.98-.02-1.96-.28-2.83-.75-.82-.55-1.48-1.33-1.89-2.24-.03 2.11-.02 4.22-.03 6.33-.07 1.83-.56 3.69-1.63 5.17-1.36 1.76-3.64 2.82-5.87 2.94-2.12.07-4.32-.57-5.88-2.04-1.84-1.83-2.51-4.71-1.74-7.18.59-1.86 2.05-3.41 3.88-4.08 1.44-.5 3.04-.45 4.45.14.01 1.34.01 2.68.01 4.02-.75-.43-1.63-.61-2.49-.49-1.04.1-2.03.73-2.54 1.66-.6 1.15-.49 2.69.34 3.7 1.01 1.1 2.76 1.35 3.98.53.9-.66 1.41-1.76 1.43-2.88.02-3.67.01-7.35.01-11.02z" />
          </svg>
          {{ t("common.tiktok") }}
        </a>
      </div>

      <div class="mb-10">
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ t("contactPage.officeInfo") }}</h3>

        <p class="text-slate-700 leading-relaxed">
          {{ t("contactPage.officeIntro") }}
        </p>

        <p class="text-slate-700 leading-relaxed mt-2">
          <strong>{{ t("contactPage.officeAddressLabel") }}:</strong><br />
          {{ t("contactPage.officeAddressLine1") }}<br />

          <a
            href="https://maps.app.goo.gl/Nh7HTgh2soifnXtv7"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-[#d97b1a] transition underline-offset-2 hover:underline"
          >
            {{ t("contactPage.officeAddressLine2") }}<br />
            {{ t("contactPage.officeAddressLine3") }}
          </a>
        </p>

        <p class="text-slate-700 leading-relaxed mt-2">
          <strong>{{ t("contactPage.officePhoneLabel") }}:</strong><br />
          <a href="tel:+886287515503" class="hover:text-[#d97b1a] transition">+886 2 8751 5503</a>
        </p>

        <p class="text-slate-500 text-sm mt-2">{{ t("contactPage.visitNote") }}</p>
      </div>

      <div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">{{ t("contactPage.sendMessage") }}</h3>

        <form
          class="space-y-4"
          action="https://formsubmit.co/6356a8a605f3c7bf8fcf5cd007f06cd7"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />

          <input type="hidden" name="_next" :value="`${origin}/contact?success=true`" />

          <input
            type="text"
            name="name"
            :placeholder="t('contactPage.form.name')"
            required
            class="w-full p-3 rounded-lg border border-slate-300"
          />

          <input
            type="email"
            name="email"
            :placeholder="t('contactPage.form.email')"
            required
            class="w-full p-3 rounded-lg border border-slate-300"
          />

          <textarea
            rows="4"
            name="message"
            :placeholder="t('contactPage.form.message')"
            required
            class="w-full p-3 rounded-lg border border-slate-300"
          ></textarea>

          <button
            type="submit"
            class="w-full px-6 py-3 bg-[#d97b1a] text-white rounded-lg hover:bg-[#bf6c16] transition"
          >
            {{ t("contactPage.form.submit") }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { t } from "@/i18n";
import { Instagram } from "lucide-vue-next";

const route = useRoute();
const origin = window.location.origin;
</script>
