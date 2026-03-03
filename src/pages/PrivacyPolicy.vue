<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
    <div class="max-w-3xl mx-auto px-6">
      <h1 class="text-4xl font-bold text-slate-900 mb-6 text-center">{{ t("privacyPage.title") }}</h1>

      <p class="text-slate-600 mb-6 leading-relaxed">{{ t("privacyPage.intro") }}</p>

      <section v-for="section in sections" :key="section.title" class="mb-10">
        <h2 class="text-2xl font-semibold text-[#d97b1a] mb-3">{{ section.title }}</h2>

        <p v-if="section.text" class="text-slate-600 leading-relaxed mb-4">
          {{ section.text }}
        </p>

        <ul v-if="section.list" class="list-disc ml-6 space-y-2 text-slate-600">
          <li v-for="item in section.list" :key="item" v-html="item"></li>
        </ul>
      </section>

      <p class="text-slate-500 italic mt-12 text-center">
        {{ t("privacyPage.effectiveDate") }}<br />
        {{ t("privacyPage.lastUpdated") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getMessage, t } from "@/i18n";

type PrivacySection = {
  title: string;
  text?: string;
  list?: string[];
};

const sections = computed(() =>
  getMessage<PrivacySection[]>("privacyPage.sections", [])
);
</script>
