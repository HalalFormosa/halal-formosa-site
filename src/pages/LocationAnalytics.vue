<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { t } from "@/i18n";
import { 
  Building2Icon,
  UtensilsIcon,
  MapPinIcon,
  BedIcon,
  GiftIcon,
  ArrowLeftIcon,
  ChurchIcon,
  ShoppingBagIcon,
  TreesIcon,
  BeefIcon,
  ChefHatIcon,
  StoreIcon
} from "lucide-vue-next";

type LocationTypeCount = {
  name: string;
  count: number;
};

const items = ref<LocationTypeCount[]>([]);
const loading = ref(true);

const getIcon = (name: string) => {
  if (name.includes('Restaurant')) return UtensilsIcon;
  if (name.includes('Stall')) return StoreIcon;
  if (name.includes('Kitchen')) return ChefHatIcon;
  if (name.includes('Mosque')) return ChurchIcon;
  if (name.includes('Prayer')) return Building2Icon;
  if (name.includes('Accomodation')) return BedIcon;
  if (name.includes('Souvenirs')) return GiftIcon;
  if (name.includes('Butcher')) return BeefIcon;
  if (name.includes('Environment')) return TreesIcon;
  return MapPinIcon;
};

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('type_id, location_types(name)')
      .eq('approved', true);

    if (error) throw error;

    const counts: Record<string, number> = {};
    data.forEach((row: any) => {
      const typeName = row.location_types?.name || 'Other';
      counts[typeName] = (counts[typeName] || 0) + 1;
    });

    items.value = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  } catch (e) {
    console.error('Error fetching location analytics:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#030614] py-24 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6">
      
      <!-- BACK BUTTON -->
      <router-link 
        to="/#stats" 
        class="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-[#d97b1a] dark:hover:text-orange-400 mb-12 transition-colors font-medium group"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        {{ t('common.back') }}
      </router-link>

      <!-- HEADER -->
      <div class="mb-16">
        <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{{ t('locationAnalytics.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">{{ t('locationAnalytics.subtitle') }}</p>
      </div>

      <!-- ANALYTICS CARDS -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="item in items" 
          :key="item.name"
          class="bg-white dark:bg-slate-900/50 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/50 flex items-center space-x-5 hover:shadow-md transition-all group"
        >
          <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <component :is="getIcon(item.name)" class="w-7 h-7 text-slate-600 dark:text-orange-400" />
          </div>
          <div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ item.count }}</div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">
              {{ t(`locationAnalytics.types.${item.name}`) !== `locationAnalytics.types.${item.name}` ? t(`locationAnalytics.types.${item.name}`) : item.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white dark:bg-slate-900/50 p-6 rounded-3xl shadow-sm animate-pulse h-28"></div>
      </div>

    </div>
  </div>
</template>
