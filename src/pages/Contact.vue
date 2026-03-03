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
          <ion-icon name="logo-instagram" class="text-xl"></ion-icon>
          {{ t("common.instagram") }}
        </a>

        <a
          href="https://www.tiktok.com/@halal_formosa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition"
        >
          <ion-icon name="logo-tiktok" class="text-xl"></ion-icon>
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

const route = useRoute();
const origin = window.location.origin;
</script>
