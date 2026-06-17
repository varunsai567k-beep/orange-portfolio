import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/work/shorts")({
  head: () => ({
    meta: [
      { title: "Shorts — Orange Edits" },
      { name: "description", content: "Short-form edits for TikTok, Reels, and YouTube Shorts by Orange Edits." },
      { property: "og:title", content: "Shorts — Orange Edits" },
      { property: "og:description", content: "Short-form edits built for the scroll." },
    ],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  return (
    <CategoryPage
      category="Shorts"
      title="Shorts."
      description="Fast, punchy short-form content built for TikTok, Reels, and YouTube Shorts — cut to trend and optimized for retention."
      videos={[]}
    />
  );
}
