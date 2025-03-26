import { NextResponse } from "next/server";
import Parser from "rss-parser";

// Define types for RSS feed
type CustomFeed = {
  title: string;
  description: string;
  link: string;
};

type CustomItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
};

export async function GET() {
  try {
    // Initialize parser with custom fields
    const parser = new Parser<CustomFeed, CustomItem>({
      customFields: {
        item: ["content", "contentSnippet"],
      },
    });

    // Replace with your actual Substack URL
    const feed = await parser.parseURL("https://lirena00.substack.com/feed");

    // Process and return only needed data from the most recent articles
    const articles = feed.items
      .slice(0, 2) // Get only the 3 most recent articles
      .map((item) => ({
        title: item.title,
        link: item.link,

        pubDate: item.pubDate,
        // Take only first ~150 chars for the excerpt
        excerpt: item.contentSnippet?.substring(0, 150) || "",
      }));

    // Return formatted data as JSON
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching Substack RSS feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
