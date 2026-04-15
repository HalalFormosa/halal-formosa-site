<template>
  <section id="testimonials" class="max-w-7xl mx-auto px-6 py-20">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#d97b1a] text-sm font-medium mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {{ t("testimonials.badge") }}
      </div>
      <h2 class="text-4xl font-bold mb-4">{{ t("testimonials.title") }}</h2>
      <p class="text-slate-600 max-w-2xl mx-auto">
        {{ t("testimonials.subtitle") }}
      </p>
    </div>

    <div
      ref="carousel"
      class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar scroll-smooth cursor-ew-resize"
    >
      <div
        v-for="item in testimonials"
        :key="item.name"
        class="min-w-[90%] md:min-w-[45%] lg:min-w-[32%] bg-white border border-slate-200 rounded-xl p-8 snap-center shadow-sm hover:shadow-lg transition h-[420px] flex flex-col"
      >
        <div class="flex gap-1 mb-4">
          <span v-for="i in 5" :key="i" class="text-[#d97b1a]">&#9733;</span>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 mb-6">
          <p class="text-slate-600 leading-relaxed">
            "{{ item.message }}"
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-orange-100 rounded-full"></div>
          <div>
            <p class="font-semibold text-slate-900">{{ item.name }}</p>
            <p class="text-sm text-slate-500">{{ item.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-2 mt-6">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="scrollToPage(page - 1)"
        class="w-2.5 h-2.5 rounded-full transition"
        :class="activePage === page - 1 ? 'bg-[#d97b1a]' : 'bg-slate-300 hover:bg-slate-400'"
        :aria-label="t('testimonials.paginationAriaLabel')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { getMessage, t } from "@/i18n";

type Testimonial = {
  name: string;
  role: string;
  message: string;
};

const cardsPerPage = ref(1);
const carousel = ref<HTMLElement | null>(null);
const activePage = ref(0);

let autoplayInterval: number | null = null;
let hoverInterval: number | null = null;

const testimonials = computed(() => getMessage<Testimonial[]>("testimonials.items", []));

const totalPages = computed(() => Math.ceil(testimonials.value.length / cardsPerPage.value));

const updateCardsPerPage = () => {
  const width = window.innerWidth;
  if (width >= 1024) cardsPerPage.value = 3;
  else if (width >= 768) cardsPerPage.value = 2;
  else cardsPerPage.value = 1;
};

const scrollToPage = (page: number) => {
  if (!carousel.value) return;

  carousel.value.scrollTo({
    left: page * carousel.value.clientWidth,
    behavior: "smooth",
  });
};

const goNext = () => {
  const next = activePage.value >= totalPages.value - 1 ? 0 : activePage.value + 1;
  scrollToPage(next);
};

const updateActivePage = () => {
  if (!carousel.value) return;

  const pageWidth = carousel.value.clientWidth;
  activePage.value = Math.round(carousel.value.scrollLeft / pageWidth);
};

const stopAutoplay = () => {
  if (!autoplayInterval) return;
  clearInterval(autoplayInterval);
  autoplayInterval = null;
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = window.setInterval(goNext, 4000);
};

const stopHoverSlide = () => {
  if (!hoverInterval) return;
  clearInterval(hoverInterval);
  hoverInterval = null;
};

const startHoverSlide = () => {
  stopAutoplay();
  stopHoverSlide();
  hoverInterval = window.setInterval(goNext, 1200);
};

onMounted(() => {
  nextTick(() => {
    if (!carousel.value) return;

    carousel.value.addEventListener("scroll", updateActivePage);
    carousel.value.addEventListener("mouseenter", startHoverSlide);
    carousel.value.addEventListener("mouseleave", () => {
      stopHoverSlide();
      startAutoplay();
    });
  });

  updateCardsPerPage();
  window.addEventListener("resize", updateCardsPerPage);
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
  stopHoverSlide();
  window.removeEventListener("resize", updateCardsPerPage);
  carousel.value?.removeEventListener("scroll", updateActivePage);
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.flex-1::-webkit-scrollbar {
  width: 4px;
}
.flex-1::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 4px;
}
</style>
