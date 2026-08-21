<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  price: string
  period?: string
  features: string[]
  disabledFeatures?: string[]
  ctaLabel?: string
  ctaHref?: string
  highlight?: boolean
  badge?: string
  variant?: 'free' | 'weekly' | 'monthly' | 'annual' | 'bronze' | 'silver' | 'gold' | 'custom'
}>()
</script>

<template>
  <div
      :class="[
      'relative rounded-xl p-8 transition-all',
      highlight
        ? 'bg-[#d97b1a] text-white border-2 border-[#d97b1a] shadow-xl scale-[1.03]'
        : 'bg-white border',
      variant === 'free' && 'border-slate-200',
      variant === 'weekly' && 'border-orange-200',
      variant === 'monthly' && 'border-orange-300',
      variant === 'bronze' && 'border-orange-200',
      variant === 'silver' && 'border-slate-300',
      variant === 'gold' && 'border-amber-400',
      variant === 'custom' && 'border-2 border-dashed border-slate-300'
    ]"
  >
    <!-- Badge -->
    <div
        v-if="badge"
        class="absolute top-4 right-4 bg-white text-[#d97b1a] px-3 py-1 rounded-full text-sm font-semibold"
    >
      {{ badge }}
    </div>

    <h3 class="text-2xl font-bold mb-1">
      {{ title }}
    </h3>

    <p v-if="subtitle" class="mb-6 text-sm opacity-80">
      {{ subtitle }}
    </p>

    <!-- Price -->
    <p class="text-4xl font-bold mb-6">
      {{ price }}
      <span v-if="period" class="text-lg font-normal opacity-80">
        /{{ period }}
      </span>
    </p>

    <!-- Features -->
    <ul class="space-y-3 mb-6">
      <li
          v-for="feature in features"
          :key="feature"
          class="flex items-center gap-2"
      >
        <span class="font-bold">✓</span>
        {{ feature }}
      </li>

      <li
          v-for="feature in disabledFeatures"
          :key="feature"
          class="flex items-center gap-2 opacity-60"
      >
        <span class="font-bold">✕</span>
        {{ feature }}
      </li>
    </ul>

    <!-- CTA -->
    <RouterLink
        v-if="ctaLabel && ctaHref"
        :to="ctaHref"
        :class="[
        'block w-full py-3 rounded-lg font-bold transition text-center',
        highlight
          ? 'bg-white text-[#d97b1a]'
          : 'border border-[#d97b1a] text-[#d97b1a] hover:bg-orange-50'
      ]"
    >
      {{ ctaLabel }}
    </RouterLink>
    <button
        v-else-if="ctaLabel"
        :class="[
        'w-full py-3 rounded-lg font-bold transition',
        highlight
          ? 'bg-white text-[#d97b1a]'
          : 'border border-[#d97b1a] text-[#d97b1a] hover:bg-orange-50'
      ]"
    >
      {{ ctaLabel }}
    </button>

    <slot />
  </div>
</template>
