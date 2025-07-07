import type { MetadataRoute } from "next";
import { posts } from ".velite";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.lirena.in/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.lirena.in/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.lirena.in/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://www.lirena.in/blogs/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
