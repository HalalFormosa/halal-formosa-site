<script setup lang="ts">
import { computed } from "vue";
import PricingCard from '@/components/PricingCard.vue'
import { getMessage, t } from "@/i18n";

const freeFeatures = computed(() => getMessage<string[]>("pricing.plans.free.features", []));
const freeDisabledFeatures = computed(() =>
  getMessage<string[]>("pricing.plans.free.disabledFeatures", [])
);
const proFeatures = computed(() => getMessage<string[]>("pricing.plans.proFeatures", []));
</script>

<template>
  <section id="pricing" class="bg-slate-50 py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#d97b1a] text-sm font-medium mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ t("pricing.badge") }}
        </div>
        <h2 class="text-4xl font-bold mb-4">{{ t("pricing.title") }}</h2>
        <p class="text-slate-600">
          {{ t("pricing.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Free -->
        <PricingCard
          :title="t('pricing.plans.free.title')"
          :subtitle="t('pricing.plans.free.subtitle')"
          price="NT$0"
          :features="freeFeatures"
          :disabled-features="freeDisabledFeatures"
          variant="free"
        />

        <!-- Weekly -->
        <PricingCard
          :title="t('pricing.plans.proWeekly.title')"
          :subtitle="t('pricing.plans.proWeekly.subtitle')"
          price="NT$39"
          :period="t('pricing.periods.week')"
          :features="proFeatures"
          variant="weekly"
        />

        <!-- Monthly -->
        <PricingCard
          :title="t('pricing.plans.proMonthly.title')"
          :subtitle="t('pricing.plans.proMonthly.subtitle')"
          price="NT$99"
          :period="t('pricing.periods.month')"
          :features="proFeatures"
          variant="monthly"
        />

        <!-- Annual (Best Value) -->
        <PricingCard
          :title="t('pricing.plans.proAnnual.title')"
          :subtitle="t('pricing.plans.proAnnual.subtitle')"
          price="NT$699"
          :period="t('pricing.periods.year')"
          :badge="t('pricing.plans.proAnnual.badge')"
          highlight
          :features="proFeatures"
          variant="annual"
        >
          <p class="text-sm text-orange-100 text-center mt-4">
            {{ t("pricing.plans.proAnnual.saveText") }}
          </p>
        </PricingCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
