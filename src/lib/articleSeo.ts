// Search titles and descriptions for the articles that bring in most of the
// search traffic. These override what the news table would otherwise produce
// (article title + the first 160 characters of the body, which is usually an
// anecdote and not a good snippet).
//
// The same file feeds the router, so the right title is in place before the
// article has finished loading from Supabase.

export type ArticleSeo = {
  title: string;
  description: string;
};

export const ARTICLE_SEO: Record<string, ArticleSeo> = {
  "taiwan-halal-food-the-ultimate-guide-to-muslim-friendly-living-in-2026": {
    title: "Halal Food in Taiwan 2026: The Complete Muslim Guide",
    description:
      "How to find halal food in Taiwan in 2026: reading labels, convenience store snacks, certified restaurants and a halal map. Written for Muslim visitors.",
  },
  "halal-food-in-taipei-the-ultimate-2026-muslim-friendly-dining-guide": {
    title: "Halal Food in Taipei 2026: Where to Eat and What to Know",
    description:
      "Halal food in Taipei for Muslim travelers: dishes to try, how to check a restaurant's halal status, and where to find prayer rooms. A 2026 guide.",
  },
  "top-10-halal-friendly-restaurants-in-taipei": {
    title: "Top 10 Halal Restaurants in Taipei for Muslim Travelers",
    description:
      "Ten halal-friendly restaurants in Taipei, from Taiwanese classics to international food. Check each place's current halal status before you go.",
  },
  "premium-halal-dining-finding-the-best-halal-restaurant-in-taipei-across-taiwan": {
    title: "Best Halal Restaurants in Taipei: Beef Noodles to Fine Dining",
    description:
      "A guide to halal restaurants in Taipei and across Taiwan, from beef noodles to fine dining, with tips on halal certification and finding places near you.",
  },
  "authentic-halal-beef-noodle-in-taipei-your-2026-muslim-friendly-dining-guide": {
    title: "Halal Beef Noodles in Taipei 2026: Where to Eat",
    description:
      "Where to find halal beef noodles in Taipei, what to check in the broth and seasonings, and how to confirm a shop's certification before you order.",
  },
  "halal-restaurants-near-me-finding-trusted-dining-across-taiwan-in-2026": {
    title: "Halal Restaurants Near Me in Taiwan: How to Find Them (2026)",
    description:
      "Looking for halal restaurants near you in Taiwan? Learn how to check certification, use a halal map and verify a place in five steps.",
  },
};

// Articles that are off topic for a halal food site. They stay readable but are
// kept out of the search index. Remove a slug from this list to index it again.
export const NOINDEX_SLUGS = new Set<string>([
  "hundreds-protest-against-taiwans-ties-with-israel-amid-genocide-in-gaza",
  "indonesia-secures-us563000-potential-halal-deals-in-bangkok",
  "the-halal-dish-that-became-one-of-nycs-most-iconic-street-foods-",
]);

// Shown at the top of the /news index so the best guides are linked from there.
export const TOP_ARTICLES: { slug: string; title: string }[] = [
  {
    slug: "taiwan-halal-food-the-ultimate-guide-to-muslim-friendly-living-in-2026",
    title: "Halal Food in Taiwan 2026: The Complete Muslim Guide",
  },
  {
    slug: "halal-food-in-taipei-the-ultimate-2026-muslim-friendly-dining-guide",
    title: "Halal Food in Taipei 2026: Where to Eat and What to Know",
  },
  {
    slug: "top-10-halal-friendly-restaurants-in-taipei",
    title: "Top 10 Halal Restaurants in Taipei for Muslim Travelers",
  },
  {
    slug: "authentic-halal-beef-noodle-in-taipei-your-2026-muslim-friendly-dining-guide",
    title: "Halal Beef Noodles in Taipei 2026: Where to Eat",
  },
  {
    slug: "halal-restaurants-near-me-finding-trusted-dining-across-taiwan-in-2026",
    title: "Halal Restaurants Near Me in Taiwan: How to Find Them",
  },
  {
    slug: "premium-halal-dining-finding-the-best-halal-restaurant-in-taipei-across-taiwan",
    title: "Best Halal Restaurants in Taipei: Beef Noodles to Fine Dining",
  },
];

export const getArticleSeo = (slug: string): ArticleSeo | undefined =>
  ARTICLE_SEO[slug];
