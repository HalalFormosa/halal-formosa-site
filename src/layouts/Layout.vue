<template>
  <!-- Vercel Analytics -->
  <Analytics />

  <!-- Shared layout wrapper -->
  <div class="min-h-screen flex flex-col">
    <HeaderSection />

    <!-- Page content -->
    <main class="flex-1">
      <router-view />
    </main>

    <FooterSection />
    <ScrollToTop />
  </div>
</template>

<script setup>
import { Analytics } from "@vercel/analytics/vue";
import HeaderSection from "@/components/Header.vue";
import FooterSection from "@/components/Footer.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
</script>
