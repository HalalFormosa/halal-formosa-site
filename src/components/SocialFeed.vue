<template>
  <section class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#d97b1a] text-sm font-medium mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {{ t("socialFeed.badge") }}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {{ t("social.title") }}
        </h2>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto">
          {{ t("social.subtitle") }}
        </p>
      </div>

      <!-- Follow Buttons -->
      <div class="flex justify-center gap-4 mb-10 flex-wrap">
        <a
          href="https://www.instagram.com/halalformosa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90 transition shadow-md"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          {{ t("common.instagram") }}
        </a>
        <a
          href="https://www.tiktok.com/@halal_formosa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition shadow-md"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.28 6.28 0 001.88-4.48V8.73a8.26 8.26 0 004.84 1.56V6.84a4.84 4.84 0 01-1.14-.15z"/>
          </svg>
          {{ t("common.tiktok") }}
        </a>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="animate-pulse">
          <div class="bg-slate-200 dark:bg-slate-700 rounded-xl aspect-[9/16]" />
        </div>
      </div>

      <!-- Feed Grid -->
      <div v-else-if="mergedPosts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="post in mergedPosts"
          :key="post.id"
          class="group relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[9/16] cursor-pointer"
          @mouseenter="startVideoPreview($event, post)"
          @mouseleave="stopVideoPreview(post)"
          @click="openPost(post)"
        >
          <!-- Thumbnail (shown when not previewing) -->
          <img
            v-show="!post.isPlaying"
            :src="post.thumbnail_url ?? undefined"
            :alt="post.caption?.substring(0, 60) || 'Social media post'"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Video Preview (shown on hover) -->
          <video
            v-show="post.isPlaying"
            :ref="(el) => setVideoRef(post.id, el as HTMLVideoElement)"
            :src="post.isPlaying ? (post.video_url ?? undefined) : undefined"
            class="w-full h-full object-cover"
            muted
            playsinline
            loop
            preload="none"
          />

          <!-- Play Icon (only when NOT playing) -->
          <div
            v-show="!post.isPlaying"
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <!-- Gradient Overlay with Caption -->
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-16 pointer-events-none">
            <!-- Platform Badges -->
            <div class="flex items-center gap-1.5 mb-2 flex-wrap">
              <template v-for="platform in post.platforms" :key="platform">
                <a
                  :href="post.links[platform]"
                  target="_blank"
                  rel="noopener"
                  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider pointer-events-auto hover:opacity-80 transition"
                  :class="platform === 'instagram'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white'
                    : 'bg-white text-black'"
                  @click.stop
                >
                  {{ platform === 'instagram' ? 'Reel' : 'TikTok' }}
                </a>
              </template>
              <span class="text-white/60 text-[11px]">{{ formatDate(post.timestamp) }}</span>
            </div>

            <!-- Caption Preview -->
            <p class="text-white text-xs leading-relaxed line-clamp-2">
              {{ post.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { supabase } from "@/lib/supabase";
import { t, locale } from "@/i18n";

type RawPost = {
  id: string;
  caption: string | null;
  media_type: string;
  media_url: string | null;
  thumbnail_url: string | null;
  permalink: string;
  username: string;
  timestamp: string;
  video_url: string | null;
};

type MergedPost = {
  id: string;
  caption: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  timestamp: string;
  platforms: ("instagram" | "tiktok")[];
  links: Record<string, string>;
  isPlaying: boolean;
};

const mergedPosts = ref<MergedPost[]>([]);
const loading = ref(true);
const videoRefs = new Map<string, HTMLVideoElement>();

function setVideoRef(id: string, el: HTMLVideoElement | null) {
  if (el) videoRefs.set(id, el);
  else videoRefs.delete(id);
}

// Normalize caption for comparison
function normalizeCaption(caption: string | null): string {
  if (!caption) return "";
  return caption
    .toLowerCase()
    .replace(/[\n\r]+/g, " ")        // newlines → space
    .replace(/[^\w\s]/g, "")          // remove special chars & emoji
    .replace(/\s+/g, " ")            // collapse whitespace
    .trim()
    .substring(0, 80);               // first 80 chars
}

// Check if two posts are the same content cross-platform
function isSameContent(a: RawPost, b: RawPost): boolean {
  const captionA = normalizeCaption(a.caption);
  const captionB = normalizeCaption(b.caption);
  if (!captionA || !captionB) return false;

  // Check caption similarity (first 60 chars match)
  const shortA = captionA.substring(0, 60);
  const shortB = captionB.substring(0, 60);
  if (shortA !== shortB) return false;

  // Check date proximity (within 3 days)
  const dateA = new Date(a.timestamp).getTime();
  const dateB = new Date(b.timestamp).getTime();
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  return Math.abs(dateA - dateB) < threeDays;
}

function mergePosts(igPosts: RawPost[], ttPosts: RawPost[]): MergedPost[] {
  const results: MergedPost[] = [];
  const usedTiktok = new Set<string>();

  // Process each Instagram post, try to find a matching TikTok
  for (const ig of igPosts) {
    const matchingTt = ttPosts.find(
      (tt) => !usedTiktok.has(tt.id) && isSameContent(ig, tt)
    );

    if (matchingTt) {
      usedTiktok.add(matchingTt.id);
      results.push({
        id: ig.id,
        caption: ig.caption,
        thumbnail_url: ig.thumbnail_url,
        video_url: ig.video_url || matchingTt.video_url,
        timestamp: ig.timestamp,
        platforms: ["instagram", "tiktok"],
        links: {
          instagram: ig.permalink,
          tiktok: matchingTt.permalink,
        },
        isPlaying: false,
      });
    } else {
      results.push({
        id: ig.id,
        caption: ig.caption,
        thumbnail_url: ig.thumbnail_url,
        video_url: ig.video_url,
        timestamp: ig.timestamp,
        platforms: ["instagram"],
        links: { instagram: ig.permalink },
        isPlaying: false,
      });
    }
  }

  // Add remaining unmatched TikTok posts
  for (const tt of ttPosts) {
    if (!usedTiktok.has(tt.id)) {
      results.push({
        id: tt.id,
        caption: tt.caption,
        thumbnail_url: tt.thumbnail_url,
        video_url: tt.video_url,
        timestamp: tt.timestamp,
        platforms: ["tiktok"],
        links: { tiktok: tt.permalink },
        isPlaying: false,
      });
    }
  }

  // Sort by date, take latest 8
  return results
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);
}

const fetchPosts = async () => {
  try {
    const [igRes, ttRes] = await Promise.all([
      supabase
        .from("instagram_posts")
        .select("id, caption, media_type, media_url, thumbnail_url, permalink, username, timestamp, video_url")
        .order("timestamp", { ascending: false })
        .limit(12),
      supabase
        .from("tiktok_posts")
        .select("id, caption, media_type, media_url, thumbnail_url, permalink, username, timestamp, video_url")
        .order("timestamp", { ascending: false })
        .limit(12),
    ]);

    mergedPosts.value = mergePosts(igRes.data ?? [], ttRes.data ?? []);
  } catch (e) {
    console.error("Failed to fetch social posts:", e);
  } finally {
    loading.value = false;
  }
};

const startVideoPreview = (_event: Event, post: MergedPost) => {
  if (!post.video_url) return;
  post.isPlaying = true;

  // Wait for next tick so the video element is rendered with src
  requestAnimationFrame(() => {
    const video = videoRefs.get(post.id);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked — fall back to thumbnail
        post.isPlaying = false;
      });
    }
  });
};

const stopVideoPreview = (post: MergedPost) => {
  post.isPlaying = false;
  const video = videoRefs.get(post.id);
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
};

const openPost = (post: MergedPost) => {
  // Prefer Instagram link, fallback to TikTok
  const url = post.links.instagram || post.links.tiktok;
  if (url) window.open(url, "_blank", "noopener");
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return locale.value === "zh-tw" ? "今天" : "Today";
  if (diffDays === 1) return locale.value === "zh-tw" ? "昨天" : "Yesterday";
  if (diffDays < 7) return locale.value === "zh-tw" ? `${diffDays} 天前` : `${diffDays}d ago`;
  return date.toLocaleDateString(locale.value === "zh-tw" ? "zh-TW" : "en-US", {
    month: "short",
    day: "numeric",
  });
};

onMounted(fetchPosts);

onBeforeUnmount(() => {
  // Clean up any playing videos
  for (const video of videoRefs.values()) {
    video.pause();
  }
  videoRefs.clear();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
