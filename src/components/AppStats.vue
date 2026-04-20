<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { supabase } from "@/lib/supabase";
import { t } from "@/i18n";
import { StoreIcon, MapPinIcon } from "lucide-vue-next";

const productsCount = ref<number | null>(null);
const locationsCount = ref<number | null>(null);
const animatedProducts = ref(0);
const animatedLocations = ref(0);

function animateValue(target: number, duration: number, onUpdate: (val: number) => void) {
  const start = performance.now();
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    onUpdate(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

watch(productsCount, (val) => {
  if (val !== null) animateValue(val, 1500, (v) => animatedProducts.value = v);
});

watch(locationsCount, (val) => {
  if (val !== null) animateValue(val, 1500, (v) => animatedLocations.value = v);
});

onMounted(async () => {
  try {
    const { count: pCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('approved', true)
      .not('status', 'is', null);

    if (pCount !== null) productsCount.value = pCount;

    const { count: lCount } = await supabase
      .from('locations')
      .select('*', { count: 'exact', head: true })
      .eq('approved', true);

    if (lCount !== null) locationsCount.value = lCount;
  } catch (e) {
    console.error('Error fetching stats:', e);
  }
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 pb-20">
    <div class="grid grid-cols-2 md:grid-cols-2 gap-12 py-12">
      
      <!-- PRODUCTS STAT (Clickable) -->
      <router-link 
        to="/analytics/products"
        class="flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105"
      >
        <div class="mb-6 transition-all duration-300">
          <StoreIcon class="w-16 h-16 text-[#d97b1a] dark:text-orange-400 group-hover:scale-110 transition-transform" />
        </div>
        <div class="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
          <span v-if="productsCount !== null">{{ animatedProducts }}</span>
          <span v-else class="animate-pulse bg-slate-200 dark:bg-slate-700 h-12 w-32 rounded inline-block"></span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 font-semibold text-lg">{{ t('stats.products') }}</p>
        <p class="text-xs text-[#d97b1a] dark:text-orange-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          {{ t('stats.clickDetails') }}
        </p>
      </router-link>

      <!-- LOCATIONS STAT (Clickable) -->
      <router-link 
        to="/analytics/locations"
        class="flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105"
      >
        <div class="mb-6 transition-all duration-300">
          <MapPinIcon class="w-16 h-16 text-slate-600 dark:text-[#d97b1a] transition-transform group-hover:scale-110" />
        </div>
        <div class="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
          <span v-if="locationsCount !== null">{{ animatedLocations }}</span>
          <span v-else class="animate-pulse bg-slate-200 dark:bg-slate-700 h-12 w-32 rounded inline-block"></span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 font-semibold text-lg">{{ t('stats.locations') }}</p>
        <p class="text-xs text-[#d97b1a] dark:text-orange-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          {{ t('stats.clickDetails') }}
        </p>
      </router-link>

    </div>
  </section>
</template>
