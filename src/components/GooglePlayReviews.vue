<script setup lang="ts">
import { onMounted } from "vue";
import { t } from "@/i18n";

onMounted(() => {
  const scriptSrc =
    "https://www.jotform.com/website-widgets/embed/019c1d5029f4711aa6bf99151fbfaea5a7b3";

  // Clear container in case of SPA re-entry.
  const container = document.getElementById(
    "JFWebsiteWidget-019c1d5029f4711aa6bf99151fbfaea5a7b3"
  );
  if (container) container.innerHTML = "";

  // Load script only once.
  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>

<template>
  <section class="py-16 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#d97b1a] text-sm font-medium mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {{ t("googlePlayReviews.badge") }}
        </div>
        <h2 class="text-4xl font-bold mb-4">
          {{ t("googlePlayReviews.title") }}
        </h2>
        <p class="text-slate-600 max-w-2xl mx-auto">
          {{ t("googlePlayReviews.subtitle") }}
        </p>
      </div>


      <!-- Jotform widget container -->
      <div id="JFWebsiteWidget-019c1d5029f4711aa6bf99151fbfaea5a7b3"></div>
    </div>
  </section>
</template>
