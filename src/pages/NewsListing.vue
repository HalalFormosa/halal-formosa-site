<template>
  <section class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div class="max-w-6xl mx-auto px-6 py-24">

      <!-- Page Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#d97b1a] text-sm font-medium mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          {{ t("newsPage.badge") }}
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {{ t("newsPage.title") }}
        </h1>
        <p class="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
          {{ t("newsPage.subtitle") }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="bg-slate-200 dark:bg-slate-700 rounded-2xl h-52" />
          <div class="mt-4 space-y-3">
            <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-1/3" />
            <div class="bg-slate-200 dark:bg-slate-700 h-6 rounded-full w-full" />
            <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-2/3" />
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p class="text-slate-600 text-lg">{{ t("newsPage.errorLoading") }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="articles.length === 0" class="text-center py-16">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p class="text-slate-600 text-lg">{{ t("newsPage.noArticles") }}</p>
      </div>

      <!-- Articles Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="`/news/${article.slug || article.id}`"
          class="group"
        >
          <article class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d97b1a]/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            <!-- Image -->
            <div class="relative overflow-hidden h-52">
              <img
                v-if="article.header_image"
                :src="article.header_image"
                :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-[#d97b1a]/20 to-orange-100 dark:from-[#d97b1a]/10 dark:to-slate-800 flex items-center justify-center">
                <svg class="w-12 h-12 text-[#d97b1a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <!-- Date Badge -->
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                {{ formatDate(article.created_at) }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 flex flex-col flex-1">
              <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-[#d97b1a] transition-colors">
                {{ article.title }}
              </h2>

              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                {{ stripHtml(article.content) }}
              </p>

              <!-- Author & Read More -->
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <span v-if="article.author_name" class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {{ article.author_name }}
                </span>
                <span v-else />

                <span class="inline-flex items-center gap-1 text-xs font-semibold text-[#d97b1a] group-hover:gap-2 transition-all">
                  {{ t("newsPage.readMore") }}
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
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
  author_name: string | null;
};

const articles = ref<NewsArticle[]>([]);
const loading = ref(true);
const error = ref(false);

const fetchArticles = async () => {
  try {
    loading.value = true;
    error.value = false;

    const { data, error: fetchError } = await supabase
      .from("news")
      .select("id, title, slug, header_image, content, created_at, author_name")
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    articles.value = data ?? [];
  } catch (e) {
    console.error("Failed to fetch news:", e);
    error.value = true;
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

onMounted(fetchArticles);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
