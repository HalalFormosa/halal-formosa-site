<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">

    <!-- HERO -->
    <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
    >
      <HeroSection />
    </div>

    <!-- STATS -->
    <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-anchor-placement="top-bottom"
    >
      <AppStats />
    </div>

    <!-- FEATURES -->
    <div
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-anchor-placement="top-bottom"
    >
      <FeaturesSection />
    </div>

    <!-- SUPPORTED BY -->
    <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-anchor-placement="top-bottom"
    >
      <SupportedBySection />
    </div>


    <!-- PRICING -->
    <div
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-anchor-placement="top-bottom"
    >
      <PricingSection />
    </div>

    <!-- TESTIMONIALS -->
    <div
        data-aos="fade-up"
        data-aos-delay="350"
        data-aos-anchor-placement="top-bottom"
    >
      <TestimonialsSection />
    </div>

    <!-- GOOGLE PLAY REVIEWS -->
    <div data-aos="fade-up" data-aos-delay="400">
      <GooglePlayReviews />
    </div>

    <!-- SOCIAL FEED -->
    <div data-aos="fade-up" data-aos-delay="450">
      <SocialFeed />
    </div>

    <!-- RECENT NEWS -->
    <div data-aos="fade-up" data-aos-delay="500">
      <RecentNews />
    </div>


    <!-- FINAL CTA -->
    <div
        data-aos="fade-up"
        data-aos-delay="450"
        data-aos-anchor-placement="top-bottom"
    >
      <FinalCTASection />
    </div>

    <router-view />
  </div>
</template>



<script setup>
import HeroSection from "@/components/Hero.vue"
import AppStats from "@/components/AppStats.vue"
import FeaturesSection from "@/components/Features.vue"
import SupportedBySection from "@/components/SupportedBySection.vue"
import TestimonialsSection from "@/components/Testimonials.vue"
import PricingSection from "@/components/Pricing.vue"
import FinalCTASection from "@/components/FinalCTA.vue"
import GooglePlayReviews from "@/components/GooglePlayReviews.vue";
import SocialFeed from "@/components/SocialFeed.vue";
import RecentNews from "@/components/RecentNews.vue";
</script>

<style scoped>
* {
  scroll-behavior: smooth;
}
</style>
