<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "lucide-vue-next";

const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <button
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#d97b1a] hover:bg-[#c06a15] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center opacity-0 translate-y-4"
    :class="{ 'opacity-100 translate-y-0': isVisible }"
    aria-label="Scroll to top"
  >
    <ArrowUp class="w-5 h-5" />
  </button>
</template>
