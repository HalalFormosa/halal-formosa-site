<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { t } from "@/i18n";
import { 
  CheckCircle2Icon, 
  UserCheckIcon, 
  AlertTriangleIcon, 
  XCircleIcon,
  ArrowLeftIcon
} from "lucide-vue-next";

type Stats = {
  Halal: number;
  'Muslim-friendly': number;
  Syubhah: number;
  Haram: number;
};

const stats = ref<Stats>({
  Halal: 0,
  'Muslim-friendly': 0,
  Syubhah: 0,
  Haram: 0,
});

const loading = ref(true);

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('status')
      .eq('approved', true);

    if (error) throw error;

    const counts = {
      Halal: 0,
      'Muslim-friendly': 0,
      Syubhah: 0,
      Haram: 0,
    };

    data.forEach((row: any) => {
      if (row.status in counts) {
        counts[row.status as keyof Stats]++;
      }
    });

    stats.value = counts;
  } catch (e) {
    console.error('Error fetching product analytics:', e);
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
        <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{{ t('analytics.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">{{ t('analytics.subtitle') }}</p>
      </div>

      <!-- ANALYTICS CARDS -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- HALAL -->
        <div class="bg-white dark:bg-slate-900/50 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-emerald-900/20 flex items-center space-x-6 hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center">
            <CheckCircle2Icon class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.Halal }}</div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">{{ t('analytics.halal') }}</p>
          </div>
        </div>

        <!-- MUSLIM FRIENDLY -->
        <div class="bg-white dark:bg-slate-900/50 p-8 rounded-3xl shadow-sm border border-blue-50 dark:border-blue-900/20 flex items-center space-x-6 hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
            <UserCheckIcon class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats['Muslim-friendly'] }}</div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">{{ t('analytics.muslimFriendly') }}</p>
          </div>
        </div>

        <!-- SYUBHAH -->
        <div class="bg-white dark:bg-slate-900/50 p-8 rounded-3xl shadow-sm border border-orange-50 dark:border-orange-900/20 flex items-center space-x-6 hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center">
            <AlertTriangleIcon class="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.Syubhah }}</div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">{{ t('analytics.syubhah') }}</p>
          </div>
        </div>

        <!-- HARAM -->
        <div class="bg-white dark:bg-slate-900/50 p-8 rounded-3xl shadow-sm border border-rose-50 dark:border-rose-900/20 flex items-center space-x-6 hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center">
            <XCircleIcon class="w-8 h-8 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.Haram }}</div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">{{ t('analytics.haram') }}</p>
          </div>
        </div>

      </div>

      <!-- LOADING STATE -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="i in 4" :key="i" class="bg-white dark:bg-slate-900/50 p-8 rounded-3xl shadow-sm animate-pulse h-32"></div>
      </div>

    </div>
  </div>
</template>
