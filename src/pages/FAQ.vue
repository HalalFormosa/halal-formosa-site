<template>
  <section class="max-w-5xl mx-auto px-6 py-24">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ t("faqPage.title") }}</h1>
      <p class="text-slate-600 text-lg max-w-3xl mx-auto">{{ t("faqPage.subtitle") }}</p>
    </div>

    <div class="bg-white shadow-sm rounded-xl border border-slate-200">
      <div
        v-for="(item, index) in faqs"
        :key="index"
        class="border-b last:border-b-0 border-slate-200"
      >
        <button class="w-full flex items-center justify-between px-8 py-6 text-left" @click="toggle(index)">
          <h3 class="text-lg font-semibold text-slate-900">{{ item.q }}</h3>

          <span class="ml-6 text-[#d97b1a] text-2xl font-light">
            {{ openIndex === index ? "−" : "+" }}
          </span>
        </button>

        <transition name="accordion">
          <div v-if="openIndex === index" class="px-8 pb-6 text-slate-700 leading-relaxed">
            {{ item.a }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getMessage, t } from "@/i18n";

type FaqItem = {
  q: string;
  a: string;
};

const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = computed(() => getMessage<FaqItem[]>("faqPage.items", []));
</script>

<style scoped>
.accordion-enter-from {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to {
  opacity: 1;
  max-height: 500px;
}
.accordion-enter-active {
  transition: all 0.25s ease;
}
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
}
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-leave-active {
  transition: all 0.2s ease;
}
</style>
