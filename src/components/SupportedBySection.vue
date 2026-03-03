<template>
  <section
      class="py-20 bg-white"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
  >
    <div class="max-w-6xl mx-auto px-6 text-center">
      <!-- Title -->
      <h2 class="text-4xl font-bold text-center mb-4">Supported By</h2>

      <!-- Subtitle -->
      <p class="mt-3 text-gray-600 max-w-2xl mx-auto">
        We are grateful for the support of organizations and communities who
        share our mission.
      </p>

      <!-- Logos -->
      <div class="mt-8 flex flex-wrap justify-center gap-10">
        <div
            v-for="supporter in visibleSupporters"
            :key="supporter.name"
            class="flex items-center justify-center grayscale hover:grayscale-0 transition duration-300"
        >
          <a
              :href="supporter.url"
              target="_blank"
              rel="noopener noreferrer"
              class="h-24 w-[200px] overflow-hidden flex items-center justify-center"
              :title="supporter.name"
          >
            <img
                :src="supporter.logo"
                :alt="supporter.name"
                class="h-28 object-contain transition"
                :class="supporter.scale"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { computed } from "vue"

const visibleSupporters = computed(() =>
    supporters.filter(s => s.active)
)

const supporters = [
  {
    name: "Islamic Association of Taiwan",
    logo: "/supporters/iat-logo.jpg",
    scale: "scale-90",
    url: "https://www.iat.org.tw", // example
    active: true
  },
  {
    name: "Islamic Commercial Development, Ltd",
    logo: "/supporters/icd-taiwan.webp",
    scale: "scale-100",
    url: "https://www.icdhalal.com/",
    active: false
  },
  {
    name: "Indonesia Economic and Trade Office in Taiwan",
    logo: "/supporters/kdei-taipei.jpeg",
    scale: "scale-90",
    url: "https://www.kdei-taipei.org",
    active: true
  },
  {
    name: "International Madani Association Taiwan",
    logo: "/supporters/ima-taiwan-logo.jpg",
    scale: "scale-85",
    url: "https://www.instagram.com/ima_taiwan/?hl=en",
    active: true
  },
  {
    name: "Forum Mahasiswa Muslim Indonesia di Taiwan",
    logo: "/supporters/formmit.jpg",
    scale: "scale-110",
    url: "https://formmit.or.id/",
    active: true
  },
  {
    name: "Islam Taiwan",
    logo: "/supporters/islam-taiwan.png",
    scale: "scale-110",
    url: "https://www.islamtaiwan.com/en",
    active: true
  },
  {
    name: "Taipei Grand Mosque",
    logo: "/supporters/tgm.jpg",
    scale: "scale-85",
    url: "https://www.taipeimosque.org.tw/",
    active: true
  },
  {
    name: "Al-Hadi Taiwan Islamic Education & Culture Center",
    logo: "/supporters/al-hadi.jpeg",
    scale: "scale-85",
    url: "https://alhaditaiwan.org/",
    active: true
  },
  {
    name: "CrossBond",
    logo: "/supporters/crossbond.png",
    scale: "scale-85",
    url: "https://www.crossbond.tw/",
    active: true
  },
  {
    name: "Kuliner Halal Taiwan",
    logo: "/supporters/kuliner-halal.jpg",
    scale: "scale-85",
    url: "https://www.instagram.com/kulinerhalaltaiwan/",
    active: true
  },
  {
    name: "Mahkota Taiwan",
    logo: "/supporters/nihao-indo.jpg",
    scale: "scale-85",
    url: "https://www.youtube.com/@nihaoindonesia8855",
    active: false
  },
  {
    name: "Nihao Indo",
    logo: "/supporters/nihao-indo.jpg",
    scale: "scale-85",
    url: "https://www.youtube.com/@nihaoindonesia8855",
    active: false
  },
]
</script>

