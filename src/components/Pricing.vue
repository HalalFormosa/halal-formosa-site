<script setup lang="ts">
import PricingCard from '@/components/PricingCard.vue'
</script>

<template>
  <section id="pricing" class="bg-slate-50 py-20">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-4">Pricing</h2>
      <p class="text-slate-600 text-center mb-16">
        Choose the perfect plan for your needs
      </p>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <!-- Free -->
        <PricingCard
            title="Free"
            subtitle="Start exploring Taiwan"
            price="NT$0"
            :features="[
            'Halal Map Access',
            'Basic Ingredient Scanning',
            '10 Scans Daily'
          ]"
            :disabled-features="[
            'Unlimited Scans',
            'Smart “For You” Feed',
            'No Ads'
          ]"
            variant="free"
        />

        <!-- Weekly -->
        <PricingCard
            title="Pro Weekly"
            subtitle="Short trips & visitors"
            price="NT$39"
            period="week"
            :features="[
            'Everything in Free',
            '🤖 AI Ingredient Explanation',
            'Smart “For You” Feed',
            'No Ads',
            'Unlimited Scans',
            'Priority Support 24/7'
          ]"

            variant="weekly"
        />

        <!-- Monthly -->
        <PricingCard
            title="Pro Monthly"
            subtitle="Most flexible for frequent visits"
            price="NT$99"
            period="month"
            :features="[
            'Everything in Free',
            '🤖 AI Ingredient Explanation',
            'Smart “For You” Feed',
            'No Ads',
            'Unlimited Scans',
            'Priority Support 24/7'
          ]"
            variant="monthly"
        />

        <!-- Annual (Best Value) -->
        <PricingCard
            title="Pro Annual"
            subtitle="Best for Muslims living in Taiwan"
            price="NT$699"
            period="year"
            badge="Best Value"
            highlight
            :features="[
    'Everything in Free',
    '🤖 AI Ingredient Explanation',
    'Smart “For You” Feed',
    'No Ads',
    'Unlimited Scans',
    'Priority Support 24/7'
  ]"

            variant="annual"
        >
          <p class="text-sm text-orange-100 text-center mt-4">
            Save over <strong>40%</strong> compared to monthly · Less than NT$2 per day
          </p>
        </PricingCard>

      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
