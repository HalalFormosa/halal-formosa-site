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
      <h2 class="text-4xl font-bold text-center mb-4">
        {{ t("googlePlayReviews.title") }}
      </h2>

      <p class="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        {{ t("googlePlayReviews.subtitle") }}
      </p>


      <!-- Jotform widget container -->
      <div id="JFWebsiteWidget-019c1d5029f4711aa6bf99151fbfaea5a7b3"></div>
    </div>
  </section>
</template>
