<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  title: string
  subtitle?: string
  price: string
  period?: string
  features: string[]
  /** Optional explanations, aligned by index with `features`; an empty string means no hint for that row. */
  hints?: string[]
  disabledFeatures?: string[]
  ctaLabel?: string
  ctaHref?: string
  highlight?: boolean
  badge?: string
  variant?: 'free' | 'weekly' | 'monthly' | 'annual' | 'bronze' | 'silver' | 'gold' | 'custom'
}>()

// Tapping the (i) button toggles a hint on touch screens, where there is no hover.
const openHint = ref<number | null>(null)
const closeHint = () => { openHint.value = null }
onMounted(() => document.addEventListener('click', closeHint))
onBeforeUnmount(() => document.removeEventListener('click', closeHint))
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
          v-for="(feature, i) in features"
          :key="feature"
          class="group relative flex items-center gap-2"
      >
        <span class="font-bold">✓</span>
        {{ feature }}
        <template v-if="hints?.[i]">
          <button
              type="button"
              class="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold opacity-70 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              :aria-label="feature + ': ' + hints[i]"
              :aria-expanded="openHint === i"
              @click.stop="openHint = openHint === i ? null : i"
          >i</button>
          <span
              role="tooltip"
              :class="[
              'absolute left-0 top-full z-20 mt-2 w-full rounded-lg bg-slate-900 px-3 py-2 text-left text-sm font-normal leading-snug text-white shadow-lg',
              openHint === i ? 'block' : 'hidden group-hover:block group-focus-within:block'
            ]"
          >{{ hints[i] }}</span>
        </template>
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
