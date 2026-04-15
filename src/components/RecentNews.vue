<template>
  <section id="news" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#d97b1a] text-sm font-medium mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          {{ t("recentNews.badge") }}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {{ t("recentNews.title") }}
        </h2>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto">
          {{ t("recentNews.subtitle") }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="animate-pulse">
          <div class="bg-slate-200 dark:bg-slate-700 rounded-2xl h-44" />
          <div class="mt-4 space-y-2">
            <div class="bg-slate-200 dark:bg-slate-700 h-3 rounded-full w-1/4" />
            <div class="bg-slate-200 dark:bg-slate-700 h-5 rounded-full w-full" />
            <div class="bg-slate-200 dark:bg-slate-700 h-3 rounded-full w-2/3" />
          </div>
        </div>
      </div>

      <!-- Articles -->
      <div v-else-if="articles.length > 0" class="grid md:grid-cols-3 gap-6">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="`/news/${article.slug || article.id}`"
          class="group"
        >
          <article class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d97b1a]/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            <!-- Image -->
            <div class="relative overflow-hidden h-44">
              <img
                v-if="article.header_image"
                :src="article.header_image"
                :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-[#d97b1a]/20 to-orange-100 dark:from-[#d97b1a]/10 dark:to-slate-800 flex items-center justify-center">
                <svg class="w-10 h-10 text-[#d97b1a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <div class="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                {{ formatDate(article.created_at) }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-[#d97b1a] transition-colors">
                {{ article.title }}
              </h3>

              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                {{ stripHtml(article.content) }}
              </p>

              <span class="inline-flex items-center gap-1 text-xs font-semibold text-[#d97b1a] group-hover:gap-2 transition-all mt-auto">
                {{ t("newsPage.readMore") }}
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </article>
        </router-link>
      </div>

      <!-- View All Button -->
      <div v-if="!loading && articles.length > 0" class="text-center mt-10">
        <router-link
          to="/news"
          class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#d97b1a] text-[#d97b1a] rounded-xl font-semibold hover:bg-[#d97b1a] hover:text-white transition-all duration-200"
        >
          {{ t("recentNews.viewAll") }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { t, locale } from "@/i18n";

type NewsArticle = {
  id: string;
  title: string;
  slug: string | null;
  header_image: string | null;
  content: string | null;
  created_at: string;
};

const articles = ref<NewsArticle[]>([]);
const loading = ref(true);

const fetchRecentNews = async () => {
  try {
    const { data } = await supabase
      .from("news")
      .select("id, title, slug, header_image, content, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    articles.value = data ?? [];
  } catch (e) {
    console.error("Failed to fetch recent news:", e);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale.value === "zh-tw" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const stripHtml = (html: string | null): string => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent?.trim() ?? "";
};

onMounted(fetchRecentNews);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
