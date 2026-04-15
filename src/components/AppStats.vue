<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { t } from "@/i18n";
import { StoreIcon, MapPinIcon } from "lucide-vue-next";

const productsCount = ref<number | null>(null);
const locationsCount = ref<number | null>(null);

onMounted(async () => {
  try {
    const { count: pCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
      
    if (pCount !== null) productsCount.value = pCount;

    const { count: lCount } = await supabase
      .from('locations')
      .select('*', { count: 'exact', head: true });
      
    if (lCount !== null) locationsCount.value = lCount;
  } catch (e) {
    console.error('Error fetching stats:', e);
  }
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 pb-20">
    <div class="grid grid-cols-2 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      
      <!-- PRODUCTS STAT -->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
          <StoreIcon class="w-6 h-6 text-[#d97b1a]" />
        </div>
        <div class="text-4xl font-bold text-slate-900 mb-2 mt-2">
          <span v-if="productsCount !== null">{{ productsCount }}+</span>
          <span v-else class="animate-pulse bg-slate-200 h-10 w-24 rounded inline-block"></span>
        </div>
        <p class="text-slate-500 font-medium">{{ t('stats.products') }}</p>
      </div>

      <!-- LOCATIONS STAT -->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
          <MapPinIcon class="w-6 h-6 text-[#d97b1a]" />
        </div>
        <div class="text-4xl font-bold text-slate-900 mb-2 mt-2">
          <span v-if="locationsCount !== null">{{ locationsCount }}+</span>
          <span v-else class="animate-pulse bg-slate-200 h-10 w-24 rounded inline-block"></span>
        </div>
        <p class="text-slate-500 font-medium">{{ t('stats.locations') }}</p>
      </div>

    </div>
  </section>
</template>
