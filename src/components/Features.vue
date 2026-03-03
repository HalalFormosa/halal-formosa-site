<script setup lang="ts">
import { computed } from "vue";
import { getMessage, t } from "@/i18n";

type FeatureItem = {
  title: string;
  description: string;
};

const items = computed(() => getMessage<FeatureItem[]>("features.items", []));
</script>

<template>
  <section id="features" class="bg-slate-900 text-white py-24">

    <div class="max-w-4xl mx-auto text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold">{{ t("features.title") }}</h2>
      <p class="text-slate-300 mt-4">
        {{ t("features.subtitle") }}
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-28 px-6">

      <!-- Feature 1 -->
      <div
          class="flex flex-col md:flex-row items-center gap-6 md:gap-12"
          data-aos="zoom-in"
      >
        <img
            src="/features/feature-1.png"
            class="w-full max-w-[500px] mx-auto drop-shadow-xl"
        />
        <div class="text-center md:text-left md:ml-4">
          <h3 class="text-3xl font-semibold mb-3">{{ items[0]?.title }}</h3>
          <p class="text-slate-300 text-lg">
            {{ items[0]?.description }}
          </p>
        </div>
      </div>

      <!-- Feature 2 -->
      <div
          class="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12"
          data-aos="zoom-in"
          data-aos-delay="150"
      >
        <img
            src="/features/feature-2.png"
            class="w-full max-w-[500px] mx-auto drop-shadow-xl"
        />
        <div class="text-center md:text-right md:mr-4">
          <h3 class="text-3xl font-semibold mb-3">{{ items[1]?.title }}</h3>
          <p class="text-slate-300 text-lg">
            {{ items[1]?.description }}
          </p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div
          class="flex flex-col md:flex-row items-center gap-6 md:gap-12"
          data-aos="zoom-in"
          data-aos-delay="300"
      >
        <img
            src="/features/feature-3.png"
            class="w-full max-w-[500px] mx-auto drop-shadow-xl"
        />
        <div class="text-center md:text-left md:ml-4">
          <h3 class="text-3xl font-semibold mb-3">{{ items[2]?.title }}</h3>
          <p class="text-slate-300 text-lg">
            {{ items[2]?.description }}
          </p>
        </div>
      </div>

      <!-- Feature 4 -->
      <div
          class="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12"
          data-aos="zoom-in"
          data-aos-delay="450"
      >
        <img
            src="/features/feature-4.png"
            class="w-full max-w-[500px] mx-auto drop-shadow-xl"
        />
        <div class="text-center md:text-right md:mr-4">
          <h3 class="text-3xl font-semibold mb-3">{{ items[3]?.title }}</h3>
          <p class="text-slate-300 text-lg">
            {{ items[3]?.description }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
