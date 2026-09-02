<template>
  <section
      class="py-20 bg-white"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
  >
    <div class="max-w-6xl mx-auto px-6 text-center">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#d97b1a] text-sm font-medium mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {{ t("supportedBy.badge") }}
        </div>
        <h2 class="text-4xl font-bold mb-4">{{ t("supportedBy.title") }}</h2>
        <p class="text-slate-600 max-w-2xl mx-auto">
          {{ t("supportedBy.subtitle") }}
        </p>
      </div>

      <!-- Logos -->
      <div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
        <div
            v-for="supporter in visibleSupporters"
            :key="supporter.name"
            class="grayscale hover:grayscale-0 transition duration-300 w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-4.5rem)/4)] lg:w-[calc((100%-6rem)/5)]"
        >
          <a
              :href="supporter.url"
              target="_blank"
              rel="noopener noreferrer"
              class="h-16 sm:h-28 w-full rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 sm:p-4"
              :title="supporter.name"
          >
            <img
                :src="supporter.logo"
                :alt="supporter.name"
                class="max-h-full max-w-full object-contain transition"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { computed } from "vue"
import { t } from "@/i18n";

const visibleSupporters = computed(() =>
    supporters
        .filter(s => s.active)
        .sort((a, b) => a.name.localeCompare(b.name))
)

const supporters = [
  {
    name: "Islamic Association of Taiwan",
    logo: "/supporters/iat-logo.jpg",
    url: "https://www.iat.org.tw", // example
    active: true
  },
  {
    name: "Islamic Commercial Development, Ltd",
    logo: "/supporters/icd-taiwan.webp",
    url: "https://www.icdhalal.com/",
    active: false
  },
  {
    name: "Indonesia Economic and Trade Office in Taiwan",
    logo: "/supporters/kdei-taipei.jpeg",
    url: "https://www.kdei-taipei.org",
    active: true
  },
  {
    name: "International Madani Association Taiwan",
    logo: "/supporters/ima-taiwan-logo.jpg",
    url: "https://www.instagram.com/ima_taiwan/?hl=en",
    active: true
  },
  {
    name: "Forum Mahasiswa Muslim Indonesia di Taiwan",
    logo: "/supporters/formmit.jpg",
    url: "https://formmit.or.id/",
    active: true
  },
  {
    name: "Islam Taiwan",
    logo: "/supporters/islam-taiwan.png",
    url: "https://www.islamtaiwan.com/en",
    active: true
  },
  {
    name: "Taipei Grand Mosque",
    logo: "/supporters/tgm.jpg",
    url: "https://www.taipeimosque.org.tw/",
    active: true
  },
  {
    name: "Al-Hadi Taiwan Islamic Education & Culture Center",
    logo: "/supporters/al-hadi.jpeg",
    url: "https://alhaditaiwan.org/",
    active: true
  },
  {
    name: "CrossBond",
    logo: "/supporters/crossbond.png",
    url: "https://www.crossbond.tw/",
    active: true
  },
  {
    name: "Kuliner Halal Taiwan",
    logo: "/supporters/kuliner-halal.jpg",
    url: "https://www.instagram.com/kulinerhalaltaiwan/",
    active: true
  },
  {
    name: "Mahkota Taiwan",
    logo: "/supporters/nihao-indo.jpg",
    url: "https://www.youtube.com/@nihaoindonesia8855",
    active: false
  },
  {
    name: "Nihao Indo",
    logo: "/supporters/nihao-indo.jpg",
    url: "https://www.youtube.com/@nihaoindonesia8855",
    active: false
  },
  {
    name: "Dakwah Halal Foundation",
    logo: "/supporters/dakwah-halal-foundation.png",
    url: "https://halal.org.tw/",
    active: true
  },
  {
    name: "Kedai Sri Rahayu",
    logo: "/supporters/kedai-sri-rahayu.png",
    url: "https://www.facebook.com/sri.rahayu.cks/",
    active: true
  },
  {
    name: "Amanah Group",
    logo: "/supporters/amanah-group.png",
    url: "https://www.instagram.com/amanah.tw/",
    active: true
  },
  {
    name: "Halal IMA Taiwan",
    logo: "/supporters/halal-ima-taiwan-logo.png",
    url: "https://www.instagram.com/ima_taiwan/?hl=en",
    active: true
  },
]
</script>

