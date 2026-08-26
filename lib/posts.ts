import postsData from "@/data/posts.json";

export type PostType = "article" | "video" | "audio";

export type Post = {
  slug: string;
  title: string;
  type: PostType;
  excerpt: string;
  body: string;
  featuredImage: string;
  videoUrl?: string;
  audioUrl?: string;
  date: string;
  published: boolean;
};

export function getAllPosts(): Post[] {
  return (postsData as Post[])
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentPosts(limit = 3): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((p) => p.slug === slug);
}

export function normalizeImagePath(src: string): string {
  if (!src) return "/assets/hero-bg.jpg";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  // legacy paths like "assets/hero-bg.jpg" → "/assets/hero-bg.jpg"
  return `/${src}`;
}
