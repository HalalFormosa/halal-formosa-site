import { watch } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedLoaded,
} from "vue-router";

import { getMessage, locale, t } from "@/i18n";
import Layout from "@/layouts/Layout.vue";
import Home from "@/pages/Home.vue";
import PrivacyPolicy from "@/pages/PrivacyPolicy.vue";
import TermsOfService from "@/pages/TermsOfService.vue";
import About from "@/pages/About.vue";
import Contact from "@/pages/Contact.vue";
import FAQ from "@/pages/FAQ.vue";
import NewsListing from "@/pages/NewsListing.vue";
import NewsArticle from "@/pages/NewsArticle.vue";

const SITE_URL = "https://halalformosa.com";
const DEFAULT_TITLE_KEY = "seo.defaults.title";
const DEFAULT_DESCRIPTION_KEY = "seo.defaults.description";
const ROUTE_JSONLD_ID = "route-schema-data";

type FaqItem = {
  q: string;
  a: string;
};

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
          meta: {
            titleKey: "seo.home.title",
            descriptionKey: "seo.home.description",
          },
        },
        {
          path: "about",
          name: "About",
          component: About,
          meta: {
            titleKey: "seo.about.title",
            descriptionKey: "seo.about.description",
          },
        },
        {
          path: "contact",
          name: "Contact",
          component: Contact,
          meta: {
            titleKey: "seo.contact.title",
            descriptionKey: "seo.contact.description",
          },
        },
        {
          path: "faq",
          name: "FAQ",
          component: FAQ,
          meta: {
            titleKey: "seo.faq.title",
            descriptionKey: "seo.faq.description",
          },
        },
        {
          path: "privacy",
          name: "Privacy",
          component: PrivacyPolicy,
          meta: {
            titleKey: "seo.privacy.title",
            descriptionKey: "seo.privacy.description",
          },
        },
        {
          path: "terms",
          name: "Terms",
          component: TermsOfService,
          meta: {
            titleKey: "seo.terms.title",
            descriptionKey: "seo.terms.description",
          },
        },
        {
          path: "news",
          name: "News",
          component: NewsListing,
          meta: {
            titleKey: "seo.news.title",
            descriptionKey: "seo.news.description",
          },
        },
        {
          path: "news/:id",
          name: "NewsArticle",
          component: NewsArticle,
          meta: {
            titleKey: "seo.newsArticle.title",
            descriptionKey: "seo.newsArticle.description",
          },
        },
      ],
    },
  ],

  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

const ensureMetaByName = (name: string): HTMLMetaElement => {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (element) return element;

  element = document.createElement("meta");
  element.setAttribute("name", name);
  document.head.appendChild(element);
  return element;
};

const ensureMetaByProperty = (property: string): HTMLMetaElement => {
  let element = document.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;
  if (element) return element;

  element = document.createElement("meta");
  element.setAttribute("property", property);
  document.head.appendChild(element);
  return element;
};

const ensureCanonical = (): HTMLLinkElement => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonical) return canonical;

  canonical = document.createElement("link");
  canonical.setAttribute("rel", "canonical");
  document.head.appendChild(canonical);
  return canonical;
};

const upsertJsonLd = (id: string, payload: object) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
};

const buildPageUrl = (path: string) => {
  const cleanPath = path === "/" ? "/" : path.replace(/\/$/, "");
  return new URL(cleanPath, SITE_URL).toString();
};

const applyRouteStructuredData = (
  to: RouteLocationNormalizedLoaded,
  title: string,
  description: string,
  canonicalUrl: string
) => {
  const baseWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: locale.value === "zh-tw" ? "zh-TW" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Halal Formosa",
      url: SITE_URL,
    },
  };

  if (to.name !== "FAQ") {
    upsertJsonLd(ROUTE_JSONLD_ID, baseWebPage);
    return;
  }

  const faqItems = getMessage<FaqItem[]>("faqPage.items", []);
  const mainEntity = faqItems.slice(0, 12).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));

  upsertJsonLd(ROUTE_JSONLD_ID, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: canonicalUrl,
    inLanguage: locale.value === "zh-tw" ? "zh-TW" : "en",
    mainEntity,
  });
};

const applyDocumentMeta = (to: RouteLocationNormalizedLoaded) => {
  const titleKey =
    typeof to.meta?.titleKey === "string" ? to.meta.titleKey : DEFAULT_TITLE_KEY;

  const descriptionKey =
    typeof to.meta?.descriptionKey === "string"
      ? to.meta.descriptionKey
      : DEFAULT_DESCRIPTION_KEY;

  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonicalUrl = buildPageUrl(to.path);
  const ogLocale = locale.value === "zh-tw" ? "zh_TW" : "en_US";

  document.title = title;

  ensureMetaByName("description").setAttribute("content", description);
  ensureMetaByName("robots").setAttribute(
    "content",
    "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  );

  ensureMetaByProperty("og:title").setAttribute("content", title);
  ensureMetaByProperty("og:description").setAttribute("content", description);
  ensureMetaByProperty("og:url").setAttribute("content", canonicalUrl);
  ensureMetaByProperty("og:type").setAttribute("content", "website");
  ensureMetaByProperty("og:site_name").setAttribute("content", "Halal Formosa");
  ensureMetaByProperty("og:locale").setAttribute("content", ogLocale);

  ensureMetaByName("twitter:card").setAttribute("content", "summary_large_image");
  ensureMetaByName("twitter:title").setAttribute("content", title);
  ensureMetaByName("twitter:description").setAttribute("content", description);
  ensureMetaByName("twitter:url").setAttribute("content", canonicalUrl);

  ensureCanonical().setAttribute("href", canonicalUrl);

  applyRouteStructuredData(to, title, description, canonicalUrl);
};

router.afterEach((to) => {
  applyDocumentMeta(to);
});

watch(
  locale,
  () => {
    applyDocumentMeta(router.currentRoute.value);
  },
  { immediate: true }
);

export default router;
