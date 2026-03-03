<template>
  <section class="max-w-5xl mx-auto px-6 py-24">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ t("aboutPage.title") }}</h1>

      <p class="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
        {{ t("aboutPage.intro") }}
      </p>

      <p class="text-slate-500 text-sm mt-3">{{ t("aboutPage.brandLine") }}</p>
    </div>

    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-4">{{ t("aboutPage.visionTitle") }}</h2>
      <p class="text-slate-700 leading-relaxed">{{ t("aboutPage.visionText") }}</p>
    </div>

    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-4">{{ t("aboutPage.missionTitle") }}</h2>
      <p v-for="paragraph in missionParagraphs" :key="paragraph" class="text-slate-700 leading-relaxed mt-4 first:mt-0">
        {{ paragraph }}
      </p>
    </div>

    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-6">{{ t("aboutPage.timelineTitle") }}</h2>

      <div class="max-h-[320px] overflow-y-auto pr-2 space-y-7 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div v-for="(item, index) in [...timeline].reverse()" :key="`${item.date}-${index}`" class="flex items-start gap-4">
          <div class="mt-2 w-3 h-3 rounded-full bg-[#d97b1a] flex-shrink-0"></div>

          <div>
            <p class="text-slate-900" :class="index === 0 ? 'font-semibold' : 'font-medium'">
              {{ item.date }}
            </p>

            <p class="text-slate-700">
              {{ item.description }}
              <a
                v-if="item.link"
                :href="item.link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-[#d97b1a] hover:underline"
              >
                {{ item.link.label }}
              </a>
              <span v-if="item.extra"> {{ item.extra }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-10">
      <h2 class="text-2xl font-bold text-[#d97b1a] text-center mb-10">{{ t("aboutPage.teamTitle") }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="member in team" :key="member.name" class="text-center">
          <div
            v-if="member.photo"
            @click="openZoom(member)"
            class="w-48 h-48 mx-auto rounded-full border-4 border-[#d97b1a] shadow-md mb-5 overflow-hidden cursor-zoom-in"
          >
            <img
              :src="member.photo"
              :alt="member.name"
              class="w-full h-full object-cover transition-transform"
              :style="{
                transform: `scale(${member.imageScale ?? 1.3}) translateX(${member.imageOffsetX ?? 0}px)`,
                objectPosition: `center ${member.imageOffsetY ?? 45}%`
              }"
            />
          </div>

          <div
            v-else
            class="w-48 h-48 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border-4 border-dashed border-slate-300 mb-5"
          >
            <span class="text-sm">{{ t("aboutPage.photoPlaceholder") }}</span>
          </div>

          <h3 class="text-xl font-semibold text-slate-900">{{ member.name }}</h3>
          <p class="text-slate-500 text-sm mb-3">{{ member.role }}</p>

          <ul class="text-slate-700 text-sm space-y-2 text-left max-w-xs mx-auto">
            <li v-for="line in member.description" :key="line">
              {{ line }}
            </li>
          </ul>

          <a
            v-if="member.instagram"
            :href="`https://instagram.com/${member.instagram}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mt-4 text-sm text-[#d97b1a] font-medium hover:underline"
          >
            <ion-icon name="logo-instagram" />
            <span>{{ member.instagram }}</span>
          </a>
        </div>
      </div>
    </div>

    <div
      v-if="zoomedMember"
      class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      @click.self="closeZoom"
    >
      <div class="flex flex-col items-center gap-4">
        <img
          v-if="zoomedMember?.photo"
          :src="zoomedMember.photo"
          :alt="zoomedMember.name"
          class="max-w-[90vw] max-h-[70vh] rounded-xl shadow-2xl"
        />

        <div class="text-center text-white">
          <p class="text-xl font-semibold">{{ zoomedMember.name }}</p>
          <p class="text-sm opacity-80">{{ zoomedMember.role }}</p>
        </div>
      </div>

      <button
        @click="closeZoom"
        class="absolute top-6 right-6 text-white text-3xl font-light hover:opacity-70"
        :aria-label="t('aboutPage.close')"
      >
        ×
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getMessage, t } from "@/i18n";

type TimelineItem = {
  date: string;
  description: string;
  link?: {
    label: string;
    url: string;
  };
  extra?: string;
};

type TeamLocale = {
  name: string;
  role: string;
  description: string[];
};

type TeamMember = TeamLocale & {
  photo?: string | null;
  instagram?: string | null;
  imageOffsetX?: number;
  imageOffsetY?: number;
  imageScale?: number;
};

const zoomedMember = ref<TeamMember | null>(null);

const openZoom = (member: TeamMember) => {
  zoomedMember.value = member;
};

const closeZoom = () => {
  zoomedMember.value = null;
};

const missionParagraphs = computed(() =>
  getMessage<string[]>("aboutPage.missionParagraphs", [])
);

const timeline = computed(() => getMessage<TimelineItem[]>("aboutPage.timeline", []));

const teamMedia: Array<Pick<TeamMember, "photo" | "instagram" | "imageScale" | "imageOffsetX" | "imageOffsetY">> = [
  {
    photo: "/team/founder-rakha.jpg",
    instagram: "rakharamadhana",
    imageScale: 2,
    imageOffsetX: -10,
    imageOffsetY: 20,
  },
  {
    photo: "/team/co-founder-sherlis.jpg",
    instagram: "sherlisoktaviani",
    imageScale: 1.25,
    imageOffsetX: 1,
    imageOffsetY: -5,
  },
  {
    photo: "/team/marketing-director-paul.jpg",
    imageScale: 1.05,
    imageOffsetX: 4,
    imageOffsetY: -8,
  },
];

const team = computed<TeamMember[]>(() => {
  const localizedTeam = getMessage<TeamLocale[]>("aboutPage.team", []);
  return localizedTeam.map((member, index) => ({
    ...member,
    ...teamMedia[index],
  }));
});
</script>

<style scoped></style>
