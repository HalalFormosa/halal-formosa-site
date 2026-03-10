<template>
  <section class="max-w-5xl mx-auto px-6 py-24">

    <!-- About Us -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">
        About Us
      </h1>

      <p class="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
        Halal Formosa is Taiwan’s first Muslim-friendly digital ecosystem that
        helps Muslims discover halal food, scan ingredients, explore halal maps,
        and travel across Taiwan with confidence.
      </p>

      <p class="text-slate-500 text-sm mt-3">
        Halal Formosa 清真福爾摩沙
      </p>

    </div>

    <!-- Vision -->
    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-4">
        Our Vision
      </h2>
      <p class="text-slate-700 leading-relaxed">
        Our vision is to become a trusted halal information ecosystem in Taiwan,
        built through collaboration to empower Muslims to live and travel with confidence.
      </p>
    </div>

    <!-- Mission -->
    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-4">
        Our Mission
      </h2>
      <p class="text-slate-700 leading-relaxed">
        Our mission is to empower Muslims living in or visiting Taiwan by providing
        accurate, accessible, and community-driven halal information supported by responsible technology.
      </p>

      <p class="text-slate-700 leading-relaxed mt-4">
        We achieve this by building digital tools for halal discovery, supporting
        transparent information sharing, and fostering constructive collaboration
        with Muslim organizations, halal certification bodies, Muslim-friendly travel
        providers, and community stakeholders.
      </p>

      <p class="text-slate-700 leading-relaxed mt-4">
        Through responsible technology and open engagement, we aim to support the
        long-term growth and sustainability of the Muslim community in Taiwan.
      </p>


    </div>

    <!-- Timeline -->
    <div class="bg-white shadow-sm rounded-xl p-8 border border-slate-200 mb-12">
      <h2 class="text-2xl font-bold text-[#d97b1a] mb-6">
        Our Timeline
      </h2>

      <!-- Scrollable Timeline -->
      <div
          class="max-h-[320px] overflow-y-auto pr-2 space-y-7
           scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
      >
        <div
            v-for="(item, index) in [...timeline].reverse()"
            :key="item.date"
            class="flex items-start gap-4"
        >
          <div class="mt-2 w-3 h-3 rounded-full bg-[#d97b1a] flex-shrink-0"></div>

          <div>
            <p
                class="text-slate-900"
                :class="index === 0 ? 'font-semibold' : 'font-medium'"
            >
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
              <span v-if="item.extra">{{ item.extra }}
  </span>
            </p>

          </div>
        </div>
      </div>
    </div>

    <!-- Our Team -->
    <div class="bg-white rounded-xl p-10">
      <h2 class="text-2xl font-bold text-[#d97b1a] text-center mb-10">
        Our Team
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div
            v-for="member in team"
            :key="member.name"
            class="text-center"
        >
          <!-- Photo -->
          <div
              v-if="member.photo"
              @click="openZoom(member)"
              class="w-48 h-48 mx-auto rounded-full
         border-4 border-[#d97b1a]
         shadow-md mb-5
         overflow-hidden
         cursor-zoom-in"
          >
            <img
                :src="member.photo"
                :alt="member.name"
                class="w-full h-full object-cover transition-transform"
                :style="{
  transform: `
    scale(${member.imageScale ?? 1.3})
    translateX(${member.imageOffsetX ?? 0}px)
  `,
  objectPosition: `center ${member.imageOffsetY ?? 45}%`
}"

            />
          </div>



          <div
              v-else
              class="w-48 h-48 mx-auto rounded-full bg-slate-200
         flex items-center justify-center text-slate-400
         border-4 border-dashed border-slate-300
         mb-5"
          >
            <span class="text-sm">Photo</span>
          </div>


          <!-- Name & Role -->
          <h3 class="text-xl font-semibold text-slate-900">
            {{ member.name }}
          </h3>

          <p class="text-slate-500 text-sm mb-3">
            {{ member.role }}
          </p>

          <!-- Description -->
          <ul class="text-slate-700 text-sm space-y-2 text-left max-w-xs mx-auto">
            <li v-for="line in member.description" :key="line">
              {{ line }}
            </li>
          </ul>

          <!-- Instagram -->
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

    <!-- Photo Zoom Modal -->
    <div
        v-if="zoomedMember"
        class="fixed inset-0 z-50 bg-black/70
         flex items-center justify-center"
        @click.self="closeZoom"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Image -->
        <img
            v-if="zoomedMember?.photo"
            :src="zoomedMember.photo"
            :alt="zoomedMember.name"
            class="max-w-[90vw] max-h-[70vh] rounded-xl shadow-2xl"
        />


        <!-- Name & Role -->
        <div class="text-center text-white">
          <p class="text-xl font-semibold">
            {{ zoomedMember.name }}
          </p>
          <p class="text-sm opacity-80">
            {{ zoomedMember.role }}
          </p>
        </div>
      </div>

      <!-- Close button -->
      <button
          @click="closeZoom"
          class="absolute top-6 right-6 text-white
           text-3xl font-light hover:opacity-70"
          aria-label="Close"
      >
        ×
      </button>
    </div>


  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TeamMember = {
  name: string
  role: string
  photo?: string | null
  instagram?: string | null
  description?: string[]
  imageOffsetX?: number   // 👈 NEW (px)
  imageOffsetY?: number   // (%)
  imageScale?: number
}




const zoomedMember = ref<TeamMember | null>(null)

const openZoom = (member: TeamMember) => {
  zoomedMember.value = member
}

const closeZoom = () => {
  zoomedMember.value = null
}



const team: TeamMember[] = [
  {
    name: 'Rakha Ramadhana A.B.',
    role: 'Founder',
    photo: '/team/founder-rakha.jpg',
    instagram: 'rakharamadhana',
    imageScale: 2,
    imageOffsetX: -10,
    imageOffsetY: 20,
    description: [
      'Lead engineer and architect of the Halal Formosa platform',
      'Responsible for development and maintenance of the iOS, Android, and web applications',
      'Builds and maintains the website, landing pages, and core system infrastructure',
    ],
  },
  {
    name: 'Sherlis Oktaviani',
    role: 'Co-Founder',
    photo: '/team/co-founder-sherlis.jpg',
    instagram: 'sherlisoktaviani',
    imageScale: 1.25,
    imageOffsetX: 1,
    imageOffsetY: -5,
    description: [
      'Leads social media actualization and digital presence',
      'Creates and manages content such as reels, videos, and stories',
      'Develops marketing strategies and community outreach initiatives',
    ],
  },
  {
    name: 'Paul Yang',
    role: 'Marketing Director',
    photo: '/team/marketing-director-paul.jpg',
    imageScale: 1.05,
    imageOffsetX: 4,
    imageOffsetY: -8,
    description: [
      'Leads marketing strategy, partnerships, and external relations for Halal Formosa',
      'Responsible for resource mobilization, funding opportunities, and merchant cooperation',
      'Engages with Taiwan government bodies and industry stakeholders to support platform growth',
    ],
  }
]


const timeline = [
  {
    date: '25 July 2025',
    description:
        'Halal Formosa was officially founded and the initial web application was launched to support halal discovery features.',
  },
  {
    date: '2 August 2025',
    description:
        'The Halal Formosa mobile application was released on the Google Play Store. The iOS version remains under development.',
  },
  {
    date: '10 December 2025',
    description:
        'The official Halal Formosa website and public landing page were launched, providing clearer platform information, onboarding, and institutional visibility.',
  },
  {
    date: '27 January 2026',
    description:
        'Halal Formosa was formally introduced to the',
    link: {
      label: 'Indonesian Economic and Trade Office to Taipei (KDEI Taipei)',
      url: 'https://kdei-taipei.org/',
    },
    extra:
        ' during an official audience with Mr. Arif Sulistyo. During the meeting, both parties expressed a shared commitment to exploring collaborative efforts to support Muslim communities, particularly Indonesian Muslims living in or visiting Taiwan, through improved access to information and community-oriented initiatives.',
  },

  {
    date: '27 January 2026',
    description:
        'Halal Formosa entered into a publishing and operational partnership with',
    link: {
      label: 'YiQi Global Consulting (藝啟文創行銷有限公司)',
      url: 'https://www.yiqiconsultant.com/',
    },
    extra:
        '. Under this collaboration, YiQi Global Consulting supports platform publishing, registration, and operational requirements in Taiwan, enabling formal business activities and broader institutional collaboration.',
  },
]

</script>

<style scoped></style>
