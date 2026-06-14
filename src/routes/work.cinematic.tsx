import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import thumb from "@/assets/work-cinematic.jpg";

export const Route = createFileRoute("/work/cinematic")({
  head: () => ({
    meta: [
      { title: "Cinematic Reels — Orange Edits" },
      { name: "description", content: "Story-driven cinematic reels, color grading, and sound design by Orange Edits." },
      { property: "og:title", content: "Cinematic Reels — Orange Edits" },
      { property: "og:description", content: "Cinematic shorts, color, and sound." },
    ],
  }),
  component: CinematicPage,
});

const videos = [
  { title: "Golden Hour Short Film", desc: "Anamorphic dreamscape with custom color grade.", thumb, duration: "3:12" },
  { title: "Brand Documentary", desc: "Behind-the-scenes story for a coffee roastery.", thumb, duration: "5:40" },
  { title: "Travel Reel — Tokyo", desc: "Street cinematography with rhythmic cuts.", thumb, duration: "2:08" },
  { title: "Wedding Highlight", desc: "Emotional storytelling cut to original score.", thumb, duration: "4:55" },
  { title: "Fashion Film", desc: "Slow motion editorial with grade-led mood.", thumb, duration: "1:48" },
  { title: "Music Video Edit", desc: "Sync-locked cuts with light leaks and grain.", thumb, duration: "3:30" },
];

function CinematicPage() {
  return (
    <CategoryPage
      category="Cinematic Reels"
      title="Cinematic."
      description="Story-driven films and reels with deliberate pacing, custom color grades, and immersive sound design."
      videos={videos}
    />
  );
}
