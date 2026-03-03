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
      <h2 class="text-4xl font-bold text-center mb-4">{{ t("pricing.title") }}</h2>
      <p class="text-slate-600 text-center mb-16">
        {{ t("pricing.subtitle") }}
      </p>

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
