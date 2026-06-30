# Project Card: Media, Hover Preview & Link — Design

**Date:** 2026-07-01
**Scope:** `front-end/src/app/sections/Work.tsx` ("My latest work" section) and its `ProjectCard.tsx` component.
**Status:** Approved for implementation planning.

## Goal

Upgrade the project cards in the "My latest work" section so each card can:

1. Display either an image **or** a video (mutually exclusive — only one asset per card).
2. Show a hover-preview for local videos (5 seconds, muted, then reset to thumbnail).
3. Open a full-size view (modal) on click — image, local MP4 with controls, or embedded YouTube — same as today's modal interaction.
4. Expose an optional external project link the user can open in a new tab without triggering the modal.

## Non-goals

- No CMS/data fetching changes. Projects continue to live in `front-end/src/app/data/index.ts`.
- No new icon library — the one icon needed (external link) is inlined as SVG.
- No new test infrastructure. Validation is manual smoke-testing.
- No analytics, no per-card view tracking.

## Data model

In `front-end/src/app/data/index.ts`:

```ts
export type ProjectMedia =
  | { kind: 'image';   src: string }
  | { kind: 'video';   src: string;     poster?: string } // local MP4 under /public
  | { kind: 'youtube'; videoId: string; poster?: string }; // e.g. 'dQw4w9WgXcQ'

export interface Project {
  title: string;
  tags: string[];
  description?: string;
  note?: string;
  link?: string;          // NEW — optional external project URL (opens in new tab)
  media?: ProjectMedia;   // REPLACES `image`. Optional; falls back to numbered placeholder.
}
```

**Why a discriminated union:** the "interchangeable but only one asset" constraint is enforced by the TypeScript type itself — it is impossible to assign both an image and a video to the same project. Each variant carries exactly the fields it needs, and YouTube is distinguished from local MP4 explicitly instead of by URL pattern.

**Migration:** the existing single entry in `projects` migrates from

```ts
image: '/project/SaaS_dashboard.png',
```

to

```ts
media: { kind: 'image', src: '/project/SaaS_dashboard.png' },
```

## Component structure

```
front-end/src/app/components/
  ProjectCard.tsx       (refactored — orchestrator: card chrome, modal, hover/link state)
  ProjectMedia.tsx      (NEW — renders image / <video> / YouTube iframe in 3 modes)
```

### `ProjectMedia` props

```ts
interface ProjectMediaProps {
  media: ProjectMedia | undefined;
  mode: 'thumb' | 'preview' | 'full';
  fallbackIndex: number;     // for the numbered placeholder when media is undefined
  isPreviewing?: boolean;    // parent-driven trigger; only honored for local video in 'preview' mode
}
```

Mode meanings:

| mode | image | video (MP4) | youtube |
| --- | --- | --- | --- |
| `thumb` | `<img src={media.src}>` | `<video preload="metadata" muted playsInline poster={media.poster}>` paused at `currentTime=0` (no controls) | `<img src={media.poster ?? https://i.ytimg.com/vi/<id>/hqdefault.jpg}>` + "YouTube" badge |
| `preview` | same as thumb | Same `<video>` element as `thumb`; when `isPreviewing` flips to true the parent calls `play()` and starts the 5s timer | same as thumb |
| `full` | `<img>` large | `<video controls autoPlay playsInline poster={media.poster}>` with sound | `<iframe ... autoplay=1>` |

The video element is the same DOM node in both `thumb` and `preview` mode — the `mode` only affects styling and which props the parent wires up. When no `poster` is supplied, `preload="metadata"` plus a `#t=0.1` fragment on the `src` coaxes most browsers (including Safari) to render the first frame; otherwise the surface is the same `bg-surface-lighter` already used for the no-image fallback.

### `ProjectCard` responsibilities

- Owns `isOpen` (modal) and `isHovering` (preview) state.
- Renders `<ProjectMedia mode="preview" isPreviewing={isHovering} />` inside the card surface.
- Renders the external-link icon button overlay when `project.link` is set.
- Renders the modal containing `<ProjectMedia mode="full" />` plus the body (title, description, tags, note, "Visit project →" link).
- Handles keyboard activation (Enter/Space) on the card root.

## Hover preview behavior (local MP4 only)

State and refs inside `ProjectCard`:

```ts
const [isHovering, setIsHovering] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);
const stopTimerRef = useRef<number | null>(null);
```

**On `mouseenter`** (desktop pointer-fine devices only):

1. Set `isHovering = true`. `ProjectMedia` mounts a `<video muted playsInline preload="metadata">`.
2. Call `videoRef.current.play()`.
3. Start a 5-second timer:

   ```ts
   stopTimerRef.current = window.setTimeout(() => {
     const v = videoRef.current;
     if (v) { v.pause(); v.currentTime = 0; }
   }, 5000);
   ```

   If the user keeps hovering past 5s, the video remains paused on its first frame.

**On `mouseleave`:**

1. Clear `stopTimerRef`.
2. Pause the video and reset `currentTime = 0`.
3. Set `isHovering = false` → `ProjectMedia` swaps back to the static poster.

**Poster source for the `<video>`:**

- If `media.poster` is set → use it as the `poster` attribute.
- Otherwise → omit `poster` and let the browser show the first frame (`preload="metadata"` plus `playsInline`). Append `#t=0.1` to the `src` to nudge Safari into rendering a first frame.

**Touch devices** (detected via `window.matchMedia('(pointer: coarse)').matches`): skip `onMouseEnter` / `onMouseLeave` registration entirely. A tap fires the existing card click → opens the modal directly. The link icon remains independently tappable.

**`prefers-reduced-motion: reduce`**: also skip hover playback; show only the static poster.

**YouTube and image cards:** no hover playback at all. Image cards keep the existing `group-hover:scale-110` zoom. YouTube cards render `https://i.ytimg.com/vi/<videoId>/hqdefault.jpg` (unless `media.poster` overrides it) plus a small "YouTube" badge corner-pill.

## Project link button

Absolute-positioned overlay in the top-right of the media area, rendered only when `project.link` is set:

```tsx
{project.link && (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    aria-label={`Open ${project.title} in a new tab`}
    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full
               bg-surface/80 backdrop-blur-sm flex items-center justify-center
               text-text-muted hover:text-accent transition-colors
               opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
  >
    <ExternalLinkIcon className="w-4 h-4" />
  </a>
)}
```

- `stopPropagation` prevents the link click from also opening the modal.
- Hidden until card hover, but always visible on keyboard focus.
- An equivalent text link (`Visit project →`) is rendered inside the modal body so modal users can still reach the URL.
- The external-link icon is an inlined SVG (no new dependency).

## Modal (full view)

The modal container, backdrop, ESC handling, and animation are unchanged from today. Only the media area and the new body link differ.

Media area renders `<ProjectMedia mode="full" />`:

- **image** → `<img>` (as today).
- **video** (local MP4) → `<video controls autoPlay playsInline poster={media.poster}>`. Starts unmuted — opening the modal is an intentional gesture.
- **youtube** → `<iframe src="https://www.youtube.com/embed/{videoId}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen>` inside the existing `aspect-video` container.

Body additions (after tags / note, before close button):

```tsx
{project.link && (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-5 inline-flex items-center gap-2 text-accent hover:text-text transition-colors"
  >
    Visit project <ExternalLinkIcon className="w-4 h-4" />
  </a>
)}
```

## Accessibility & edge cases

- Card root upgraded to `role="button"`, `tabIndex={0}`, with `onKeyDown` for Enter/Space → opens modal. (Today's `<motion.article>` has no keyboard activation; this is a small a11y improvement bundled with the work.)
- Link `<a>` is a real anchor with `aria-label` for screen readers.
- Preview `<video>` is `muted`, `playsInline`, no `controls`, `aria-hidden="true"` (decorative — the title/description carry meaning).
- `prefers-reduced-motion: reduce` skips hover playback; modal media still plays normally on explicit user action.
- Cleanup: a `useEffect` cleanup in `ProjectCard` pauses any playing video and clears the hover timer on unmount; the modal `<video>` is paused on modal close so audio does not bleed.
- YouTube iframe is mounted only while the modal is open (and unmounted on close) so it does not consume network/CPU in the background.

## File-by-file change summary

| File | Change |
| --- | --- |
| `front-end/src/app/data/index.ts` | Replace `image?` with `media?: ProjectMedia`, add `link?: string`, export `ProjectMedia` type. Migrate the existing entry. |
| `front-end/src/app/components/ProjectMedia.tsx` | **NEW.** Renders any of the three media kinds in `thumb` / `preview` / `full` modes. |
| `front-end/src/app/components/ProjectCard.tsx` | Refactor: replace `project.image` with `<ProjectMedia>`, add hover state + timer logic, link button overlay, keyboard activation, reduced-motion handling, cleanup effect, modal body link. |
| `front-end/CUSTOMIZATION.md` | Update the "projects" section to document the new `media` shape and `link` field. |

## Testing approach

Manual smoke tests. During development, temporarily add two sample project entries to `data/index.ts` (one local MP4, one YouTube) alongside the existing image entry, then verify:

1. **Image card** — hover does nothing extra (just the existing zoom). Click opens modal. Link icon opens new tab without opening the modal.
2. **Local MP4 card** — hover starts muted playback; auto-pauses & resets at exactly ~5s. Mouse-leave before 5s also stops and resets. Click opens modal with controls and audio.
3. **YouTube card** — static thumbnail with "YouTube" badge. Click opens modal with autoplay iframe. No hover playback.
4. **Touch (DevTools responsive, `pointer: coarse`)** — tap opens modal directly; link icon stays tappable; no inline preview attempts.
5. **`prefers-reduced-motion: reduce`** — no hover playback on the MP4 card; everything else unchanged.
6. **Keyboard** — Tab to card, Enter/Space opens modal. Tab to link icon, Enter opens new tab. ESC closes modal.
7. **Modal cleanup** — close modal while video is playing; no audio continues, no console errors.

Remove the temporary sample entries before finishing.

## Open questions

None at design time. Any sample MP4 / YouTube assets needed for testing will be added by the user (or temporary public assets used during development and removed before merge).
