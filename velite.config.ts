import { defineConfig, s } from "velite";
import { date } from "zod";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "posts/**/*.mdx", // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          description: s.string().max(255), // optional field
          code: s.mdx(), // input MDX content, output HTML string.
          draft: s.boolean().default(false), // default value
          ext_link: s
            .object({
              peerlist: s.string().url().optional(), // optional URL field
              dev_to: s.string().url().optional(), // optional URL field
              substack: s.string().url().optional(), // optional URL field
            })
            .optional(), // optional object field
          slug: s.slug("posts"), // validate format, unique in posts collection
          // slug: s.path(), // auto generate slug from file path
          date: s.isodate(), // input Date-like string, output ISO Date string.
          //   cover: s.image(), // input image relative path, output image object with blurImage.
          video: s.file().optional(), // input file relative path, output file public path.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown(), // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform((data) => ({ ...data, permalink: `/blogs/${data.slug}` })),
    },
  },
});
