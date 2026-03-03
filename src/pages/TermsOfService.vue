<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
    <div class="max-w-3xl mx-auto px-6">
      <h1 class="text-4xl font-bold text-slate-900 mb-6 text-center">{{ t("termsPage.title") }}</h1>

      <p class="text-slate-600 mb-6 leading-relaxed">{{ t("termsPage.intro") }}</p>

      <section v-for="section in sections" :key="section.title" class="mb-10">
        <h2 class="text-2xl font-semibold text-[#d97b1a] mb-3">{{ section.title }}</h2>

        <p v-if="section.text" class="text-slate-600 leading-relaxed mb-4">
          {{ section.text }}
        </p>

        <ul v-if="section.list" class="list-disc ml-6 space-y-2 text-slate-600">
          <li v-for="item in section.list" :key="item" v-html="item"></li>
        </ul>

        <ol v-if="section.ordered" class="list-decimal ml-6 space-y-4 text-slate-600">
          <li v-for="item in section.ordered" :key="item.title">
            <strong>{{ item.title }}</strong>
            <ul class="list-disc ml-6 mt-2 space-y-1" v-if="item.list">
              <li v-for="subItem in item.list" :key="subItem" v-html="subItem"></li>
            </ul>
          </li>
        </ol>
      </section>

      <p class="text-slate-500 italic mt-12 text-center">
        {{ t("termsPage.effectiveDate") }}<br />
        {{ t("termsPage.lastUpdated") }}
      </p>

      <p class="text-slate-600 text-center mt-4">
        {{ t("termsPage.serviceName") }}: <strong>Halal Formosa</strong><br />
        {{ t("termsPage.serviceProvider") }}: <strong>YiQi Global Consulting (藝啟文創行銷有限公司)</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getMessage, t } from "@/i18n";

type OrderedSection = {
  title: string;
  list?: string[];
};

type TermsSection = {
  title: string;
  text?: string;
  list?: string[];
  ordered?: OrderedSection[];
};

const sections = computed(() =>
  getMessage<TermsSection[]>("termsPage.sections", [])
);
</script>
