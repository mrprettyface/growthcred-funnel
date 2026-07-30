/**
 * One place to drop in your four videos.
 *
 * Paste a YouTube or Vimeo link (or just the ID) into the matching slot below.
 * You can paste the whole link, any of these forms work:
 *   youtube("https://youtu.be/ABC123")
 *   youtube("https://www.youtube.com/watch?v=ABC123")
 *   youtube("ABC123")
 *   vimeo("https://vimeo.com/12345678")
 *   vimeo("12345678")
 *   file("/videos/workshop-vsl.mp4")   // self-hosted, put the file in public/videos/
 *
 * IMPORTANT: on YouTube set the video to "Unlisted", not "Private".
 * Private videos cannot be embedded.
 *
 * Leave a slot as null and its page keeps showing the placeholder, so you can
 * add videos one at a time.
 */

export type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "file"; src: string }
  | null;

function extractYouTubeId(input: string): string | null {
  const s = input.trim();
  // Bare 11-char id
  if (/^[\w-]{11}$/.test(s)) return s;
  const m =
    s.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/) || null;
  return m ? m[1] : null;
}

function extractVimeoId(input: string): string | null {
  const s = input.trim();
  if (/^\d+$/.test(s)) return s;
  const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

/** Paste a YouTube link or id. */
export function youtube(urlOrId: string): VideoSource {
  const id = extractYouTubeId(urlOrId);
  return id ? { kind: "youtube", id } : null;
}

/** Paste a Vimeo link or id. */
export function vimeo(urlOrId: string): VideoSource {
  const id = extractVimeoId(urlOrId);
  return id ? { kind: "vimeo", id } : null;
}

/** Self-hosted file placed in public/videos/. */
export function file(src: string): VideoSource {
  return src ? { kind: "file", src } : null;
}

/* =========================================================================
   YOUR VIDEOS. Replace null with youtube("...") / vimeo("...") / file("...").
   ========================================================================= */
export const VIDEOS: Record<string, VideoSource> = {
  workshopVsl: youtube("https://youtu.be/TDvgjpY-OrQ"), // "Workshop" video, landing page "/"
  upsell: youtube("https://youtu.be/3Qg1U1gyGOQ"), // "Operators Intensive" video, "/upsell"
  customSystem: youtube("https://youtu.be/XRliPVrPfMI"), // "Custom System" video, "/build"
  freeClass: null, // Free class, "/class" (no video yet)
  thankYou: null, // Order confirmation, "/thank-you" (no video, by design)
};

/** Builds the embed URL for iframe hosts. Files are handled by the player. */
export function embedUrl(v: VideoSource): string | null {
  if (!v) return null;
  if (v.kind === "youtube") {
    // nocookie + tuned params: no cookies until play, calmer chrome.
    return `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1`;
  }
  if (v.kind === "vimeo") {
    return `https://player.vimeo.com/video/${v.id}?dnt=1`;
  }
  return null;
}
