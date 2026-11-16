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
        v-html="safeContent"
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
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "@/lib/supabase";
import { t, locale } from "@/i18n";
import { getArticleSeo, NOINDEX_SLUGS } from "@/lib/articleSeo";

const SITE_URL = "https://halalformosa.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const ROBOTS_INDEX = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
const ARTICLE_LD_IDS = ["article-jsonld", "article-faq-jsonld", "article-breadcrumb-jsonld"];

type NewsArticle = {
  id: string;
  slug: string | null;
  title: string;
  header_image: string | null;
  content: string | null;
  created_at: string;
  updated_at: string | null;
  author_name: string | null;
};

const route = useRoute();
const router = useRouter();
const article = ref<NewsArticle | null>(null);
const loading = ref(true);
const error = ref(false);
const copied = ref(false);

const fetchArticle = async () => {
  try {
    loading.value = true;
    error.value = false;
    article.value = null;

    const param = route.params.id as string;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);

    const query = supabase
      .from("news")
      .select("id, slug, title, header_image, content, created_at, updated_at, author_name");

    const { data, error: fetchError } = await (
      isUuid ? query.eq("id", param) : query.eq("slug", param)
    ).single();

    if (fetchError) throw fetchError;

    // An article opened by its UUID but that has a slug belongs at the slug URL.
    // Move there so only one URL per article is shown and shared.
    if (isUuid && data.slug) {
      await router.replace({ path: `/news/${data.slug}`, query: route.query, hash: route.hash });
      return;
    }

    article.value = data;
  } catch (e) {
    console.error("Failed to fetch article:", e);
    error.value = true;
    applyNotFoundMeta();
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

// Some article bodies in the news table contain links that were pasted without
// a scheme ("bit.ly/...", which the browser reads as a path under /news/) or
// left as an unfilled template value ("cta_target_url"). Repair them when
// rendering so crawlers and readers never follow a broken URL.
const safeContent = computed(() => {
  const html = article.value?.content;
  if (!html) return "";
  return html
    .replace(/href="cta_target_url"/gi, `href="${SITE_URL}"`)
    .replace(/href="((?:www\.)?(?:bit\.ly|tinyurl\.com)\/[^"]*)"/gi, 'href="https://$1"');
});

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const removeMeta = (attr: "name" | "property", key: string) => {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

const setCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const setJsonLd = (id: string, payload: object) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
};

// Build FAQPage data from the "Frequently Asked Questions" section of the body:
// an h2 followed by h3 questions, each answered by the paragraphs after it.
const extractFaq = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const heading = [...doc.querySelectorAll("h2")].find((h) =>
    /frequently asked questions|^faqs?$/i.test(h.textContent?.trim() ?? "")
  );
  if (!heading) return [];

  const items: { q: string; a: string }[] = [];
  let current: { q: string; a: string[] } | null = null;
  const flush = () => {
    if (current && current.a.length) items.push({ q: current.q, a: current.a.join(" ") });
    current = null;
  };

  for (let el = heading.nextElementSibling; el && el.tagName !== "H2"; el = el.nextElementSibling) {
    if (el.tagName === "H3") {
      flush();
      current = { q: el.textContent?.trim() ?? "", a: [] };
    } else if (current && (el.tagName === "P" || el.tagName === "UL" || el.tagName === "OL")) {
      const text = el.textContent?.replace(/\s+/g, " ").trim();
      if (text) current.a.push(text);
    }
  }
  flush();
  return items.filter((i) => i.q);
};

// Cut at a word boundary so snippets do not end mid-word.
const trimTo = (text: string, max: number) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}...`;
};

const applyNotFoundMeta = () => {
  document.title = "Article not found - Halal Formosa";
  setMeta("name", "robots", "noindex,follow");
};

// Inject SEO meta tags and JSON-LD structured data
const injectSeoMeta = () => {
  const a = article.value;
  if (!a) return;

  const slug = a.slug || (route.params.id as string);
  const override = a.slug ? getArticleSeo(a.slug) : undefined;
  const url = `${SITE_URL}/news/${slug}`;

  const title = override?.title ?? `${a.title} - Halal Formosa`;
  const plainText = (a.content ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const description = override?.description ?? trimTo(plainText, 155);
  const image = a.header_image || DEFAULT_OG_IMAGE;
  const modified = a.updated_at || a.created_at;

  document.title = title;
  setCanonical(url);
  setMeta("name", "description", description);
  setMeta(
    "name",
    "robots",
    a.slug && NOINDEX_SLUGS.has(a.slug) ? "noindex,follow" : ROBOTS_INDEX
  );

  // Open Graph
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:type", "article");
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("property", "og:site_name", "Halal Formosa");

  // Twitter Card
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:url", url);
  setMeta("name", "twitter:image", image);

  // Article-specific OG tags
  setMeta("property", "article:published_time", a.created_at);
  setMeta("property", "article:modified_time", modified);
  if (a.author_name) setMeta("property", "article:author", a.author_name);

  // Article structured data
  setJsonLd("article-jsonld", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description,
    url,
    inLanguage: "en",
    datePublished: a.created_at,
    dateModified: modified,
    image: [image],
    author: {
      "@type": a.author_name === "AutoSEO" ? "Organization" : "Person",
      name: a.author_name === "AutoSEO" ? "Halal Formosa" : a.author_name || "Halal Formosa",
    },
    publisher: {
      "@type": "Organization",
      name: "Halal Formosa",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  });

  // Breadcrumbs: Home > News > Article
  setJsonLd("article-breadcrumb-jsonld", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: a.title, item: url },
    ],
  });

  // FAQ structured data, only when the article really has a FAQ section
  const faq = a.content ? extractFaq(a.content) : [];
  if (faq.length) {
    setJsonLd("article-faq-jsonld", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  } else {
    document.getElementById("article-faq-jsonld")?.remove();
  }
};

// Leaving an article must not leave its image, dates or schema on the next page.
const clearArticleMeta = () => {
  ARTICLE_LD_IDS.forEach((id) => document.getElementById(id)?.remove());
  removeMeta("property", "article:published_time");
  removeMeta("property", "article:modified_time");
  removeMeta("property", "article:author");
  setMeta("property", "og:image", DEFAULT_OG_IMAGE);
  setMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
  setMeta("name", "robots", ROBOTS_INDEX);
};

watch(() => article.value, injectSeoMeta);

// The same component is reused when only the :id changes, so refetch then.
watch(
  () => route.params.id,
  (next, prev) => {
    if (next && next !== prev) fetchArticle();
  }
);

onMounted(fetchArticle);
onBeforeUnmount(clearArticleMeta);
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
