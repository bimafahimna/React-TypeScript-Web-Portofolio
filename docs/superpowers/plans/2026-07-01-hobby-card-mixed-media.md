# Hobby Card Mixed-Media Carousel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend `HobbyCard` so each hobby holds an ordered `assets` list of images and local MP4 videos, rendered as a mixed-media carousel in the modal. Grid cover stays static; video slides autoplay muted with controls; leaving a video slide (or closing the modal) pauses and resets it.

**Architecture:** A discriminated `HobbyAsset` union replaces the current `image?` / `images?` fields. A new `HobbyMedia` component renders one asset in `cover` or `slide` mode. `HobbyCard` keeps its existing carousel state and animation, adds a callback-ref pointing at the active slide's `<video>` (if any), and pauses that video synchronously inside every navigation handler and the modal-close handler.

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, framer-motion. No new dependencies. No test runner in use — validation is `tsc -b`, ESLint (`--max-warnings 0`), and manual browser smoke tests. All commands run from `front-end/`.

**Spec:** `docs/superpowers/specs/2026-07-01-hobby-card-mixed-media-design.md`

---

## Conventions

- **Working directory for all commands:** `front-end/`.
- **Verification-per-task:** at each commit point run `npm run lint` and `npm run build` and confirm both pass with zero errors and zero warnings.
- **Commit style:** `feat:` / `refactor:` / `fix:` / `docs:` prefix, imperative mood — matches the repo convention.
- **No test runner in use.** Do not add tests. Manual smoke testing happens in Task 4.
- **Do not touch** `front-end/src/app/sections/Hero.tsx`, `Process.tsx`, or `Story.tsx` — those have unrelated unstaged changes belonging to the user.

---

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `front-end/src/app/data/index.ts` | Modify | Add `HobbyAsset` union, replace `image?` and `images?` on `Hobby` with `assets?`, migrate the `Diving` entry. |
| `front-end/src/app/components/HobbyMedia.tsx` | Create | Renders one `HobbyAsset` in `cover` or `slide` mode. `forwardRef<HTMLVideoElement>` targets the slide-mode video. |
| `front-end/src/app/components/HobbyCard.tsx` | Modify | Read `assets`; render `HobbyMedia` for cover and each slide; add `slideVideoRef` + `pauseCurrentSlideVideo` helper; pause synchronously in every nav handler and in `closeModal`; unmount cleanup; rename arrow `aria-label`s. |
| `front-end/CUSTOMIZATION.md` | Modify | Document the `assets` field for hobbies. |

---

## Task 1: Data model — add `HobbyAsset` union, migrate `Diving`

**Files:**
- Modify: `front-end/src/app/data/index.ts`

- [ ] **Step 1: Replace the `Hobby` interface and add `HobbyAsset`**

Open `front-end/src/app/data/index.ts` and locate the existing `Hobby` interface (currently around lines 33–41 with `image?`, `images?`, `span?`). Replace it with:

```ts
export type HobbyAsset =
	| { kind: 'image'; src: string }
	| { kind: 'video'; src: string; poster?: string };

export interface Hobby {
	title: string;
	description: string;
	assets?: HobbyAsset[];
	span?: 'tall' | 'wide';
}
```

The old `image?` and `images?` fields are dropped entirely. The JSDoc comments on those fields (`/** Cover + default when `images` is omitted */` and `/** Multiple photos; first item is used as the grid cover. Carousel only when length > 1. */`) go away too — the new `assets` field is self-describing.

- [ ] **Step 2: Migrate the `Diving` entry**

Find the `hobbies` array (currently near line 94–101). Replace the sole entry so the whole array reads:

```ts
export const hobbies: Hobby[] = [
	{
		title: 'Diving',
		description: 'Exploring the ocean\u2019s depths and discovering marine life through scuba diving.',
		assets: [
			{ kind: 'image', src: '/hobby/underwater_temple.JPG' },
			{ kind: 'image', src: '/hobby/uw_selfie.png' },
		],
		span: 'wide',
	},
];
```

The description string keeps the existing curly apostrophe (`\u2019`) — preserve the byte-for-byte character used today.

- [ ] **Step 3: Verify types**

Run from `front-end/`: `npm run build`

Expected: build fails inside `HobbyCard.tsx` with errors similar to `Property 'images' does not exist on type 'Hobby'` (and same for `image`). This is expected — Task 3 fixes the consumer. This step confirms the type change is real.

- [ ] **Step 4: Commit**

```bash
git add front-end/src/app/data/index.ts
git commit -m "feat(data): add HobbyAsset union for mixed-media hobby carousel"
```

Note: this commit intentionally leaves the build broken because Task 3 changes the consumer in the same PR. If your workflow forbids broken intermediate commits, batch Tasks 1–3 into a single commit.

---

## Task 2: Create `HobbyMedia` component

**Files:**
- Create: `front-end/src/app/components/HobbyMedia.tsx`

- [ ] **Step 1: Write the component**

Create `front-end/src/app/components/HobbyMedia.tsx` with EXACTLY:

```tsx
import { forwardRef } from 'react';
import type { HobbyAsset } from '../data';

type Mode = 'cover' | 'slide';

interface HobbyMediaProps {
	asset: HobbyAsset;
	mode: Mode;
	alt: string;
}

const HobbyMedia = forwardRef<HTMLVideoElement, HobbyMediaProps>(
	({ asset, mode, alt }, videoRef) => {
		if (asset.kind === 'image') {
			return (
				<img
					src={asset.src}
					alt={alt}
					className={
						mode === 'slide'
							? 'absolute inset-0 w-full h-full object-cover'
							: 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					}
				/>
			);
		}

		if (mode === 'slide') {
			return (
				<video
					ref={videoRef}
					src={asset.src}
					poster={asset.poster}
					controls
					autoPlay
					muted
					playsInline
					preload="metadata"
					aria-label={alt}
					className="absolute inset-0 w-full h-full object-contain bg-black"
				/>
			);
		}

		if (asset.poster) {
			return (
				<img
					src={asset.poster}
					alt={alt}
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
			);
		}

		const posterSrc = asset.src.includes('#') ? asset.src : `${asset.src}#t=0.1`;

		return (
			<video
				src={posterSrc}
				muted
				playsInline
				preload="metadata"
				aria-hidden="true"
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>
		);
	}
);

HobbyMedia.displayName = 'HobbyMedia';

export default HobbyMedia;
```

Notes:

- Slide-mode video uses `object-contain bg-black` (letterboxes to preserve aspect) rather than `object-cover`. Cover mode uses `object-cover` (fill the tile). This asymmetry is intentional: the carousel modal has a fixed `aspect-video` container, and cropping a vertical MP4 to fill it would hide most of the frame.
- Cover-mode video (no `poster`) is `aria-hidden="true"` because the surrounding tile already announces the hobby title.
- The `#t=0.1` fragment on `posterSrc` nudges Safari to show a first frame.
- `forwardRef<HTMLVideoElement, HobbyMediaProps>` only spreads the ref onto the slide-mode video. Cover-mode video and both image branches ignore the ref, which is safe for `forwardRef`.

- [ ] **Step 2: Verify lint passes on the new file**

Run from `front-end/`: `npx eslint src/app/components/HobbyMedia.tsx --max-warnings 0`

Expected: no output. Exit code 0.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/HobbyMedia.tsx
git commit -m "feat(components): add HobbyMedia renderer for image and local video"
```

---

## Task 3: Refactor `HobbyCard` — use `HobbyMedia`, add slide video pause logic

**Files:**
- Modify: `front-end/src/app/components/HobbyCard.tsx`

- [ ] **Step 1: Rewrite `HobbyCard.tsx`**

Replace the ENTIRE contents of `front-end/src/app/components/HobbyCard.tsx` with:

```tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Hobby } from '../data';
import HobbyMedia from './HobbyMedia';

const HobbyCard = ({ hobby, index }: { hobby: Hobby; index: number }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [slideIndex, setSlideIndex] = useState(0);
	const [slideDir, setSlideDir] = useState(0);
	const slideVideoRef = useRef<HTMLVideoElement | null>(null);

	const assets = hobby.assets ?? [];
	const coverAsset = assets[0];
	const carouselEnabled = assets.length > 1;
	const currentAsset = assets[slideIndex];

	const pauseCurrentSlideVideo = useCallback(() => {
		const v = slideVideoRef.current;
		if (v) {
			v.pause();
			v.currentTime = 0;
		}
	}, []);

	const goNext = useCallback(() => {
		if (!carouselEnabled) return;
		pauseCurrentSlideVideo();
		setSlideDir(1);
		setSlideIndex((i) => (i + 1) % assets.length);
	}, [carouselEnabled, assets.length, pauseCurrentSlideVideo]);

	const goPrev = useCallback(() => {
		if (!carouselEnabled) return;
		pauseCurrentSlideVideo();
		setSlideDir(-1);
		setSlideIndex((i) => (i - 1 + assets.length) % assets.length);
	}, [carouselEnabled, assets.length, pauseCurrentSlideVideo]);

	const goTo = useCallback(
		(i: number) => {
			if (!carouselEnabled) return;
			if (i === slideIndex) return;
			pauseCurrentSlideVideo();
			setSlideDir(i > slideIndex ? 1 : -1);
			setSlideIndex(i);
		},
		[carouselEnabled, slideIndex, pauseCurrentSlideVideo]
	);

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		pauseCurrentSlideVideo();
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) {
			setSlideIndex(0);
			setSlideDir(0);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
				return;
			}
			if (!carouselEnabled) return;
			if (e.key === 'ArrowLeft') goPrev();
			if (e.key === 'ArrowRight') goNext();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, carouselEnabled, goPrev, goNext]);

	useEffect(() => {
		const v = slideVideoRef.current;
		return () => {
			if (v) v.pause();
		};
	}, []);

	const slideVariants = {
		enter: (dir: number) => ({
			x: dir >= 0 ? '100%' : '-100%',
			opacity: 0,
		}),
		center: { x: 0, opacity: 1 },
		exit: (dir: number) => ({
			x: dir >= 0 ? '-100%' : '100%',
			opacity: 0,
		}),
	};

	const slideAltFor = (i: number) => `${hobby.title} \u2014 ${i + 1} of ${assets.length}`;

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={openModal}
				className={`group relative overflow-hidden rounded-2xl cursor-pointer ${hobby.span === 'tall'
						? 'row-span-2'
						: hobby.span === 'wide'
							? 'md:col-span-2'
							: ''
					}`}
			>
				<div
					className={`relative w-full bg-surface-lighter overflow-hidden ${hobby.span === 'tall' ? 'h-full min-h-[420px]' : 'aspect-[4/3]'
						}`}
				>
					{coverAsset ? (
						<HobbyMedia asset={coverAsset} mode="cover" alt={hobby.title} />
					) : (
						<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
					)}

					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

					<div className="absolute bottom-0 left-0 right-0 p-6">
						<span className="text-xs text-accent uppercase tracking-widest font-mono">
							{String(index + 1).padStart(2, '0')}
						</span>
						<h3 className="font-syne text-xl md:text-2xl font-bold text-text mt-1 group-hover:text-accent transition-colors duration-300">
							{hobby.title}
						</h3>
						<p className="text-sm text-text-muted mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
							{hobby.description}
						</p>
					</div>
				</div>
			</motion.div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={closeModal}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-pointer"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-surface-light cursor-default"
							role="dialog"
							aria-modal="true"
							aria-label={hobby.title}
						>
							<div
								className="aspect-video bg-surface-lighter relative overflow-hidden"
								{...(carouselEnabled
									? { role: 'region', 'aria-roledescription': 'carousel' as const }
									: {})}
							>
								{assets.length === 0 ? (
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="font-syne text-6xl font-bold text-text/10 select-none">
											{String(index + 1).padStart(2, '0')}
										</span>
									</div>
								) : carouselEnabled ? (
									<>
										<AnimatePresence initial={false} custom={slideDir} mode="popLayout">
											<motion.div
												key={slideIndex}
												custom={slideDir}
												variants={slideVariants}
												initial="enter"
												animate="center"
												exit="exit"
												transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
												className="absolute inset-0"
											>
												<HobbyMedia
													ref={(el) => {
														if (el) slideVideoRef.current = el;
													}}
													asset={currentAsset}
													mode="slide"
													alt={slideAltFor(slideIndex)}
												/>
											</motion.div>
										</AnimatePresence>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												goPrev();
											}}
											className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-text transition-colors"
											aria-label="Previous slide"
										>
											\u2039
										</button>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												goNext();
											}}
											className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-text transition-colors"
											aria-label="Next slide"
										>
											\u203a
										</button>
										<div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
											{assets.map((_, i) => (
												<button
													key={i}
													type="button"
													onClick={(e) => {
														e.stopPropagation();
														goTo(i);
													}}
													className={`h-1.5 rounded-full transition-all ${i === slideIndex ? 'w-6 bg-text' : 'w-1.5 bg-text/35 hover:bg-text/50'
														}`}
													aria-label={`Go to slide ${i + 1}`}
													{...(i === slideIndex ? { 'aria-current': true as const } : {})}
												/>
											))}
										</div>
									</>
								) : (
									<HobbyMedia
										ref={(el) => {
											if (el) slideVideoRef.current = el;
										}}
										asset={currentAsset}
										mode="slide"
										alt={hobby.title}
									/>
								)}
							</div>
							<div className="p-8">
								<h3 className="font-syne text-2xl font-bold text-text">
									{hobby.title}
								</h3>
								<p className="mt-2 text-text-muted leading-relaxed">
									{hobby.description}
								</p>
							</div>
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
								aria-label="Close"
							>
								&times;
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default HobbyCard;
```

Important literal-character notes for the code above:

- `\u2014` in `slideAltFor` is an em-dash — write it as the actual em-dash character in the file, not the escape sequence. It matches the em-dash used in today's `slideAlt`.
- `\u2039` and `\u203a` in the arrow-button labels are the "‹" and "›" characters used today — write the actual characters, not the escape sequences.
- The rest of the JSX preserves today's copy exactly (title, description, ordering, gradient classes, dot styles, aspect ratios, span layouts).

Key differences from the current `HobbyCard.tsx`:

- Imports add `useRef` and `HobbyMedia`; drop the `hobbyImageList` helper.
- Uses `hobby.assets ?? []` instead of `hobbyImageList(hobby)`.
- New `slideVideoRef` + `pauseCurrentSlideVideo` helper.
- `goPrev`, `goNext`, and a new `goTo` (for dot clicks) all call `pauseCurrentSlideVideo()` first.
- `closeModal` pauses synchronously before flipping `isOpen`.
- Escape key routes through `closeModal` (unchanged effect, but now the close-pause runs). Arrow keys route through `goPrev` / `goNext`.
- The keyboard-arrows effect depends on `goPrev`, `goNext` (both are `useCallback`), replacing the previous hand-inlined arrow-key logic.
- New unmount cleanup effect pauses the ref.
- Carousel slide now renders `<HobbyMedia ref={callbackRef} mode="slide" ...>` inside the same `AnimatePresence` slot. Wrapping in a `<motion.div>` (instead of the old `<motion.img>` directly) keeps the slide animation identical while letting `HobbyMedia` render the correct element inside. The callback ref uses the "ignore null" pattern (`if (el) slideVideoRef.current = el`) — see the note below.

  **Why "ignore null":** with `AnimatePresence` `mode="popLayout"`, the outgoing slide unmounts *after* the incoming one mounts (during the exit animation). A naive `slideVideoRef.current = el` callback ref would clobber the freshly-set ref with `null` when the old slide finally unmounts. Ignoring null on the write path means: (a) mounting a video slide points `slideVideoRef` at it, (b) mounting an image slide leaves the ref at its previous target — which is fine because `pauseCurrentSlideVideo()` already ran on the leave-side, so calling `pause()` on a now-unmounted `<video>` is a harmless no-op.
- Single-asset (`length === 1`) hobbies also render through `<HobbyMedia mode="slide">` so a single video hobby works — this replaces the old single-`<img>` branch. The layout inside is identical (no arrows, no dots).
- Arrow button `aria-label`s become `"Previous slide"` / `"Next slide"`.
- Dot buttons now use `goTo(i)` and `aria-label={`Go to slide ${i + 1}`}`.
- Close button gains `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent` (small polish matching the ProjectCard close button).

- [ ] **Step 2: Verify build and lint pass**

From `front-end/`:
- Run: `npm run build`
  Expected: build succeeds. Exit code 0. The Task 1 type errors are gone.
- Run: `npm run lint`
  Expected: exit code 0, zero errors, zero warnings.

If lint flags the unmount cleanup effect (`react-hooks/exhaustive-deps` complaining that `videoRef.current` will have changed by the time cleanup runs), keep the pattern used here — capturing the ref inside the effect body:

```tsx
useEffect(() => {
  const v = slideVideoRef.current;
  return () => {
    if (v) v.pause();
  };
}, []);
```

is the accepted workaround, matching what `ProjectCard.tsx` does.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/HobbyCard.tsx
git commit -m "refactor(HobbyCard): use HobbyMedia and pause video on slide change and close"
```

---

## Task 4: Manual smoke test with a temporary MP4

**Files:**
- Modify (temporary): `front-end/src/app/data/index.ts`
- Add (temporary): `front-end/public/hobby/sample.mp4`

- [ ] **Step 1: Drop a sample MP4**

Copy any short MP4 to `front-end/public/hobby/sample.mp4`. If you don't have one:

```bash
curl -fL -o front-end/public/hobby/sample.mp4 \
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
```

(~1 MB, 10 seconds, silent — good enough for verifying autoplay + pause behavior. For audio verification, replace with any MP4 that has an audio track.)

- [ ] **Step 2: Temporarily extend the `Diving` entry**

In `front-end/src/app/data/index.ts`, replace the `hobbies` array with:

```ts
export const hobbies: Hobby[] = [
	{
		title: 'Diving',
		description: 'Exploring the ocean\u2019s depths and discovering marine life through scuba diving.',
		assets: [
			{ kind: 'image', src: '/hobby/underwater_temple.JPG' },
			{ kind: 'video', src: '/hobby/sample.mp4' },
			{ kind: 'image', src: '/hobby/uw_selfie.png' },
		],
		span: 'wide',
	},
];
```

(Same reminder about the curly apostrophe as Task 1.)

- [ ] **Step 3: Run the dev server and walk the checklist**

Run: `npm run dev`

Open http://localhost:5173/#hobbies in a desktop browser and verify:

1. **Grid cover** — the Diving tile shows `underwater_temple.JPG` (first asset). Existing hover zoom, description slide-up, and index number all work.
2. **Modal opens on slide 1 (image)** — arrow-click, dot-click, and keyboard Left/Right all navigate; slide-transition animation works.
3. **Navigate to slide 2 (video)** — video autoplays muted with controls visible. Click the unmute button in native controls; audio becomes audible (if the MP4 you dropped has audio).
4. **Slide-change pause** — while the video is playing, click the right arrow / dot 3 / press Right. Video pauses (no audio bleeds through) and the next slide (image) shows. Navigate back to slide 2 — video restarts from frame 0 (React unmount/remount).
5. **Modal close while video plays** — return to slide 2, let it play (unmute for the strongest signal). Close the modal via backdrop click, Escape, and the close button. Audio silences immediately each time (no bleed through the ~300 ms exit animation).
6. **Cover from a video** — temporarily reorder so the video is first:

   ```ts
   assets: [
     { kind: 'video', src: '/hobby/sample.mp4' },
     { kind: 'image', src: '/hobby/underwater_temple.JPG' },
     { kind: 'image', src: '/hobby/uw_selfie.png' },
   ],
   ```

   Reload. The grid cover shows the video's first frame (Big Buck Bunny opening frame). Hover zoom still works. No autoplay, no controls, no sound.

7. **Single-video hobby** — temporarily replace the `assets` with a single video item:

   ```ts
   assets: [{ kind: 'video', src: '/hobby/sample.mp4' }],
   ```

   Reload. Grid cover shows first frame. Click the tile → modal opens with the video autoplaying muted with controls, no arrows, no dots. Close silences audio.

If any check fails, fix the underlying bug before continuing.

- [ ] **Step 4: Revert temporary changes**

Restore the `hobbies` array in `front-end/src/app/data/index.ts` back to the Task 1 form (single Diving entry with the two original images). Delete the sample file:

```bash
rm front-end/public/hobby/sample.mp4
```

Verify with `git status` that no `sample.mp4` and no test `assets` layouts remain.

- [ ] **Step 5: Final build and lint**

Run: `npm run build`
Run: `npm run lint`
Both must exit 0.

- [ ] **Step 6: No commit if nothing changed**

If Steps 3–5 required no code fixes, there is nothing to commit for this task. If fixes were made, commit them with a descriptive `fix(HobbyCard): …` message.

---

## Task 5: Update `CUSTOMIZATION.md`

**Files:**
- Modify: `front-end/CUSTOMIZATION.md`

- [ ] **Step 1: Locate or add a "Hobbies" section**

Open `front-end/CUSTOMIZATION.md` and search for a heading beginning with `#### Hobbies`. If it exists, replace it up to the next `####` heading. If it does not exist, insert the block below immediately after the `#### Projects` section ends and before the next `####` heading.

The block to insert (or replace with) EXACTLY:

````markdown
#### Hobbies

```typescript
export const hobbies: Hobby[] = [
  {
    title: 'My Hobby',
    description: 'A short line about it.',
    assets: [
      { kind: 'image', src: '/hobby/photo1.jpg' },
      { kind: 'video', src: '/hobby/clip.mp4' }, // local MP4 only
      { kind: 'image', src: '/hobby/photo2.jpg' },
    ],
    span: 'wide', // optional: 'wide' | 'tall'
  },
];
```

**The `assets` field** holds an ordered list of images and self-hosted MP4 videos. Each item is a discriminated union:

```typescript
// Static image
{ kind: 'image', src: '/hobby/photo.jpg' }

// Local MP4 (no YouTube). `poster` is optional; without it, the video's first frame is used.
{ kind: 'video', src: '/hobby/clip.mp4', poster: '/hobby/clip_poster.jpg' }
```

Behavior:

- The **grid cover** uses the first asset. If it is a video, its `poster` (or first frame) is shown as a static image — no hover playback on the cover.
- Clicking the tile opens the **carousel modal**. Navigate with the arrows, the dot indicators, or Left/Right arrow keys. Escape closes.
- **Video slides** autoplay muted with native controls visible. Click the unmute button in the controls for audio. Video pauses and resets when you leave that slide or close the modal.
- **Single-asset hobbies** work with either kind — no arrows or dots are shown.
- **Omit `assets`** to fall back to the numbered placeholder tile.

**You can:**
- Mix any number of images and videos per hobby (order is preserved).
- Use `span: 'wide'` or `'tall'` to control the tile's grid footprint.
- Remove or reorder items freely.
````

- [ ] **Step 2: Verify no other section was touched**

Skim the surrounding sections (`#### Projects`, `#### Work Experience`, `#### Social Links`, `#### Navigation Links`) to confirm they are unchanged.

- [ ] **Step 3: Commit**

```bash
git add front-end/CUSTOMIZATION.md
git commit -m "docs: document assets field for hobby carousel"
```

---

## Final verification

- [ ] **Step 1: Full checks**

From `front-end/`:
- `npm run lint` — exit code 0, zero errors, zero warnings.
- `npm run build` — exit code 0, `dist/` produced.

- [ ] **Step 2: Confirm git history and working tree**

`git log --oneline` — expect the four (or five, counting Task 4 fix) new commits on the feature branch since the design commit.

`git status` — only pre-existing unstaged `Hero.tsx` / `Process.tsx` / `Story.tsx` modifications should remain (unrelated to this feature). No `sample.mp4`, no test `assets` blocks.

- [ ] **Step 3: Ready to review or merge**
