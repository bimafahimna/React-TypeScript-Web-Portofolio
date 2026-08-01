# Hobby Card: Mixed-Media Carousel — Design

**Date:** 2026-07-01
**Scope:** `front-end/src/app/sections/Hobbies.tsx` and its `HobbyCard.tsx` component.
**Status:** Approved for implementation planning.

## Goal

Extend the hobby cards so each card can hold a mixed-media list of images and self-hosted MP4 videos, displayed as a scrollable carousel in the modal. The grid cover behavior stays close to today's — one static thumbnail per card — but the carousel gains video-slide support.

## Non-goals

- No YouTube / Vimeo / remote embeds. Videos are self-hosted local MP4 only.
- No hover-preview on the grid cover. Grid cover is always static.
- No new test infrastructure. Manual smoke test only.
- No new dependencies.
- No changes to the current arrow / dot / keyboard-arrow / Escape carousel controls or animations. Only add video-aware behavior.

## Data model

In `front-end/src/app/data/index.ts`:

```ts
export type HobbyAsset =
	| { kind: 'image'; src: string }
	| { kind: 'video'; src: string; poster?: string }; // local MP4 under /public

export interface Hobby {
	title: string;
	description: string;
	assets?: HobbyAsset[];   // replaces `image?` and `images?`. First item = grid cover.
	span?: 'tall' | 'wide';
}
```

**Why a discriminated union:** matches the shape already used for `ProjectMedia`, keeps mixed-media ordering explicit, and makes the two kinds statically distinguishable in the renderer.

**Migration:** the existing `Diving` entry migrates from

```ts
{ images: ['/hobby/underwater_temple.JPG', '/hobby/uw_selfie.png'], ... }
```

to

```ts
{
  assets: [
    { kind: 'image', src: '/hobby/underwater_temple.JPG' },
    { kind: 'image', src: '/hobby/uw_selfie.png' },
  ],
  ...
}
```

The old `image?` and `images?` fields are removed from `Hobby` entirely. Any code that read them (currently only `HobbyCard.tsx`) is updated in the same change.

## Component structure

```
front-end/src/app/components/
	HobbyMedia.tsx      (NEW — renders one HobbyAsset in 'cover' or 'slide' mode)
	HobbyCard.tsx       (modified — reads `assets`, threads a video ref through the carousel)
```

### `HobbyMedia` props

```ts
interface HobbyMediaProps {
	asset: HobbyAsset;
	mode: 'cover' | 'slide';
	alt: string;
}
```

Mode meanings:

| mode | image | video |
| --- | --- | --- |
| `cover` | `<img>` (existing zoom on parent hover) | `<img src={poster}>` if `poster` set; otherwise a paused `<video src="…#t=0.1" preload="metadata" muted playsInline>` at the same layout position |
| `slide` | `<img>` at full slide size | `<video ref={forwardedRef} controls autoPlay muted playsInline poster={poster} preload="metadata">` |

- Cover mode never has controls or playback — purely a first-frame preview when the cover happens to be a video.
- Slide-mode video **does not** set `loop` — playback stops at the last frame per the design decision.
- Slide-mode video uses `forwardRef<HTMLVideoElement>` so `HobbyCard` can pause it imperatively on slide change and modal close.

### `HobbyCard` responsibilities

Existing (preserved):

- Grid tile with span layout (`span?: 'tall' | 'wide'`), gradient overlay, index number, title, description-slide-up on hover.
- Modal with backdrop, close button, Escape to close.
- Carousel: prev/next arrows, dot indicators, arrow-key navigation, sliding animation, `aria-*` attributes.
- `slideIndex` resets to `0` on modal open.

New (this change):

- Reads `hobby.assets ?? []` (replacing the old `hobbyImageList` helper).
- Grid cover renders `<HobbyMedia asset={assets[0]} mode="cover" alt={hobby.title} />` when `assets[0]` exists; otherwise falls back to the existing gradient-only placeholder.
- Carousel slide renders `<HobbyMedia asset={assets[slideIndex]} mode="slide" alt={...} />` (with `forwardRef` for the active video slide).
- `slideVideoRef = useRef<HTMLVideoElement | null>(null)` — assigned via a callback ref on the slide-mode `<video>` element so it always points at the currently-mounted video, or is `null` when the current slide is an image.
- Pause-on-slide-change: pause synchronously inside every navigation handler (`goNext`, `goPrev`, dot-click, keyboard Left/Right) before calling `setSlideIndex(...)`. This is a small helper: `const pauseCurrentSlideVideo = () => { const v = slideVideoRef.current; if (v) { v.pause(); v.currentTime = 0; } }`. Synchronous pause is used (not a `useEffect` cleanup keyed on `[slideIndex]`) because `AnimatePresence`'s exit animation delays unmount — by the time an effect cleanup would run, the ref state is unreliable.
- Modal-close pause: `closeModal` calls `pauseCurrentSlideVideo()` synchronously before flipping `isOpen`, mirroring the `ProjectCard` pattern.
- Unmount cleanup: an empty-deps `useEffect` returns a cleanup that pauses the ref (captured at mount, per the `react-hooks/exhaustive-deps` pattern used in `ProjectCard`).

## Carousel behavior for video slides

**On slide change** (arrow click / dot click / keyboard Left/Right):

1. Navigation handler calls `pauseCurrentSlideVideo()` synchronously: `slideVideoRef.current?.pause(); slideVideoRef.current.currentTime = 0`.
2. Handler updates `slideIndex` and `slideDir` (existing behavior).
3. React unmounts the old slide, mounts the new one. If the new slide is a video, `<video autoPlay muted playsInline controls>` starts playback automatically. Browsers universally allow autoplay when `muted` is present.
4. The callback ref on the mounted `<video>` updates `slideVideoRef.current`. On unmount (image slide, or the exit-animation-delayed unmount from `AnimatePresence`), the callback ref runs with `null` and clears the ref.

**On modal close:**

- `closeModal` calls `slideVideoRef.current?.pause()` synchronously, then flips `isOpen`.
- The existing modal exit animation (`AnimatePresence`, ~300ms) unmounts the carousel; the video element goes with it.

**Non-video slides:** the callback ref only runs on the `<video>` render, so `slideVideoRef.current` stays as its previous value or `null`. All pause calls are guarded (`?.pause()`), so mixing videos and images in the same carousel produces no runtime errors.

**Muted-with-controls rationale:** browsers block `<video autoplay>` when the audio track is unmuted. Muted autoplay is the reliable path. Controls stay visible so the user can unmute and enjoy audio if they want.

**No loop:** the video plays through once and stops on the last frame (browser's native controls show the replay button). Matches the design decision.

**Return-to-a-video-slide:** because React unmounts the old slide and mounts a fresh `<video>` element for the new one, coming back to a video slide re-triggers `autoPlay` from frame 0 — this is the intended behavior.

## Grid cover for video

When `assets[0].kind === 'video'`:

- **With `poster`:** render `<img src={poster} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />` — cheapest, participates in the existing zoom-on-hover.
- **Without `poster`:** render `<video src={`${src}#t=0.1`} preload="metadata" muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />` — same layout, browser shows the first frame, no playback, no controls, no autoplay.

Either way, all existing chrome on top of the cover (gradient overlay, index number, title, description-slide-up) renders unchanged.

**No hover preview.** The grid cover is intentionally quieter than the project grid.

## Accessibility & edge cases

- Slide-mode `<video>` receives `aria-label={alt}` where `alt` follows the same format used today for slide images: `` `${hobby.title} — ${index + 1} of ${assets.length}` ``.
- Modal keeps `role="dialog" aria-modal="true"` (existing). The media container keeps `role="region" aria-roledescription="carousel"` when there is more than one asset (existing behavior).
- Arrow buttons are renamed from `aria-label="Previous image"` / `"Next image"` to `"Previous slide"` / `"Next slide"` since they now navigate mixed media. This is in scope for this feature.
- Dot indicators keep `aria-current` and the current-vs-inactive styling. No visual distinction between image-dot and video-dot per the design decision.
- Empty / omitted `assets`: same gradient-only placeholder as today.
- Cleanup: unmount effect pauses any playing slide video.
- `prefers-reduced-motion: reduce`: unchanged. Muted autoplay is unaffected by this preference. The existing sliding animation is a pre-existing behavior outside this feature's scope.

## File-by-file change summary

| File | Change |
| --- | --- |
| `front-end/src/app/data/index.ts` | Add `HobbyAsset` union. Replace `image?` and `images?` on `Hobby` with `assets?: HobbyAsset[]`. Migrate the `Diving` entry. |
| `front-end/src/app/components/HobbyMedia.tsx` | **NEW.** Renders one asset in `cover` or `slide` mode, `forwardRef<HTMLVideoElement>` for video kind. |
| `front-end/src/app/components/HobbyCard.tsx` | Refactor: replace `hobbyImageList` with `hobby.assets ?? []`; render `<HobbyMedia mode="cover">` for the grid tile; render `<HobbyMedia mode="slide">` inside the carousel with a callback ref that populates `slideVideoRef`; add pause-on-slide-change effect (cleanup keyed on `[slideIndex]`), pause-in-closeModal, unmount cleanup effect. Rename arrow aria-labels to "Previous slide" / "Next slide". Preserve all other logic (arrows, dots, keyboard nav, animation, span layouts, gradient/title/index chrome). |
| `front-end/CUSTOMIZATION.md` | Update the "Hobbies" section (or add one if missing) to document the new `assets` shape and mixed-media support. |

## Testing approach

Manual smoke test with a temporary MP4, same pattern as `ProjectCard`'s Task 7:

1. Drop a short MP4 at `front-end/public/hobby/sample.mp4` (any 5–15 second file). Fetch a public sample if you don't have one handy.
2. Temporarily extend the `Diving` entry's `assets` array with a video item in the middle:

   ```ts
   assets: [
     { kind: 'image', src: '/hobby/underwater_temple.JPG' },
     { kind: 'video', src: '/hobby/sample.mp4' },
     { kind: 'image', src: '/hobby/uw_selfie.png' },
   ],
   ```

3. `cd front-end && npm run dev` and verify:
   1. **Grid cover** — first asset (image) shown as today; hover zoom works; description slides up.
   2. **Modal open** — slide 1 (image) shown; arrow/dot navigation works; keyboard Left/Right works.
   3. **Video slide** — navigate to slide 2 (video). It autoplays muted with controls visible.
   4. **Unmute** — click the unmute button in native controls; audio is audible.
   5. **Slide-change pause** — navigate to slide 3 (image) or back to slide 1. The video pauses; navigating back to slide 2 restarts it from frame 0 (unmounted/remounted).
   6. **Modal close during video** — while the video is playing (unmuted for maximum audibility), close via backdrop click or Escape. Audio silences immediately.
   7. **Cover from video** — temporarily reorder so the first asset is a video. The grid cover shows the first frame (or `poster` if set). No hover playback.
4. Revert the temporary changes; delete `sample.mp4`.

Run `npm run lint` and `npm run build` at each commit boundary and confirm both pass with zero errors and zero warnings.

## Open questions

None at design time. Sample MP4 for testing will be a temporary asset removed before finishing.
