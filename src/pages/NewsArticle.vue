<template>
  <section class="min-h-screen bg-gradient-to-b from-slate-50 to-white">

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-6 py-24">
      <div class="animate-pulse space-y-6">
        <div class="bg-slate-200 dark:bg-slate-700 h-6 rounded-full w-24" />
        <div class="bg-slate-200 dark:bg-slate-700 h-10 rounded-full w-3/4" />
        <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-1/3" />
        <div class="bg-slate-200 dark:bg-slate-700 rounded-2xl h-80" />
        <div class="space-y-3">
          <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-full" />
          <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-5/6" />
          <div class="bg-slate-200 dark:bg-slate-700 h-4 rounded-full w-4/6" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-6 py-24 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p class="text-slate-600 dark:text-slate-400 text-lg mb-6">{{ t("newsPage.errorLoading") }}</p>
      <router-link
        to="/news"
        class="inline-flex items-center gap-2 px-6 py-3 bg-[#d97b1a] text-white rounded-lg font-medium hover:bg-[#bf6c16] transition"
      >
        {{ t("newsPage.backToArticles") }}
      </router-link>
    </div>

    <!-- Article Content -->
    <div v-else-if="article" class="max-w-4xl mx-auto px-6 py-24">

      <!-- Back Button -->
      <router-link
        to="/news"
        class="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-[#d97b1a] transition mb-8 group text-sm font-medium"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {{ t("newsPage.backToArticles") }}
      </router-link>

      <!-- Article Header -->
      <header class="mb-10">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
          {{ article.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <!-- Author -->
          <div v-if="article.author_name" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#d97b1a] to-orange-400 flex items-center justify-center text-white text-xs font-bold">
              {{ article.author_name.charAt(0).toUpperCase() }}
            </div>
            <span class="font-medium text-slate-700 dark:text-slate-300">{{ article.author_name }}</span>
          </div>

          <!-- Date -->
          <div class="flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.created_at) }}
          </div>

          <!-- Reading Time -->
          <div class="flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ readingTime }} {{ t("newsPage.minRead") }}
          </div>
        </div>
      </header>

      <!-- Header Image -->
      <div v-if="article.header_image" class="mb-10 rounded-2xl overflow-hidden shadow-lg">
        <img
          :src="article.header_image"
          :alt="article.title"
          class="w-full h-auto max-h-[500px] object-cover"
        />
      </div>

      <!-- Article Body -->
      <div
        class="article-content prose prose-slate dark:prose-invert prose-lg max-w-none
               prose-headings:text-slate-900 dark:prose-headings:text-slate-100
               prose-a:text-[#d97b1a] prose-a:no-underline hover:prose-a:underline
               prose-img:rounded-xl prose-img:shadow-md"
        v-html="article.content"
      />

      <!-- Divider -->
      <div class="border-t border-slate-200 dark:border-slate-800 mt-16 pt-10">
        <!-- Share Section -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {{ t("newsPage.shareArticle") }}
          </p>

          <div class="flex items-center gap-3">
            <button
              @click="copyLink"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-[#d97b1a] hover:text-[#d97b1a] transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {{ copied ? t("newsPage.copied") : t("newsPage.copyLink") }}
            </button>
          </div>
        </div>

        <!-- Back to All Articles -->
        <div class="text-center mt-10">
          <router-link
            to="/news"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#d97b1a] text-white rounded-lg font-medium hover:bg-[#bf6c16] transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {{ t("newsPage.backToArticles") }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/lib/supabase";
import { t, locale } from "@/i18n";

type NewsArticle = {
  id: string;
  title: string;
  header_image: string | null;
  content: string | null;
  created_at: string;
  author_name: string | null;
};

const route = useRoute();
const article = ref<NewsArticle | null>(null);
const loading = ref(true);
const error = ref(false);
const copied = ref(false);

const fetchArticle = async () => {
  try {
    loading.value = true;
    error.value = false;

    const param = route.params.id as string;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);

    const query = supabase
      .from("news")
      .select("id, title, header_image, content, created_at, author_name");

    const { data, error: fetchError } = await (
      isUuid ? query.eq("id", param) : query.eq("slug", param)
    ).single();

    if (fetchError) throw fetchError;
    article.value = data;
  } catch (e) {
    console.error("Failed to fetch article:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale.value === "zh-tw" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const readingTime = computed(() => {
  if (!article.value?.content) return 1;
  const text = article.value.content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
});

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // Fallback: select and copy
  }
};

// Inject SEO meta tags and JSON-LD structured data
const injectSeoMeta = () => {
  const a = article.value;
  if (!a) return;

  // Title
  document.title = `${a.title} - Halal Formosa`;

  // Helper to set/create meta tags
  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const plainText = a.content?.replace(/<[^>]*>/g, "").trim() ?? "";
  const description = plainText.substring(0, 160);
  const url = window.location.href;

  // Standard meta
  setMeta("name", "description", description);

  // Open Graph
  setMeta("property", "og:title", a.title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:type", "article");
  setMeta("property", "og:url", url);
  if (a.header_image) setMeta("property", "og:image", a.header_image);
  setMeta("property", "og:site_name", "Halal Formosa");

  // Twitter Card
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", a.title);
  setMeta("name", "twitter:description", description);
  if (a.header_image) setMeta("name", "twitter:image", a.header_image);

  // Article-specific OG tags
  setMeta("property", "article:published_time", a.created_at);
  if (a.author_name) setMeta("property", "article:author", a.author_name);

  // JSON-LD Article structured data
  const existingLd = document.getElementById("article-jsonld");
  if (existingLd) existingLd.remove();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description,
    url,
    datePublished: a.created_at,
    dateModified: a.created_at,
    image: a.header_image || undefined,
    author: {
      "@type": a.author_name === "AutoSEO" ? "Organization" : "Person",
      name: a.author_name || "Halal Formosa",
    },
    publisher: {
      "@type": "Organization",
      name: "Halal Formosa",
      url: "https://halalformosa.com",
      logo: {
        "@type": "ImageObject",
        url: "https://halalformosa.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const script = document.createElement("script");
  script.id = "article-jsonld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
};

watch(() => article.value, injectSeoMeta);

onMounted(fetchArticle);
</script>

<style scoped>
.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin-top: 2em;
  margin-bottom: 0.75em;
}

.article-content :deep(p) {
  margin-bottom: 1.25em;
  line-height: 1.8;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.25em;
  padding-left: 1.5em;
}

.article-content :deep(li) {
  margin-bottom: 0.5em;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 1.5em 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #d97b1a;
  padding-left: 1em;
  font-style: italic;
  color: #64748b;
  margin: 1.5em 0;
}

.article-content :deep(a) {
  color: #d97b1a;
  text-decoration: none;
  transition: color 0.15s ease;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(strong) {
  font-weight: 700;
}
</style>
