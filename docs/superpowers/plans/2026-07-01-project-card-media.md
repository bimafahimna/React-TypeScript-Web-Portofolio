# Project Card Media, Hover Preview & Link — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `ProjectCard` in the "My latest work" section to render image OR video (mutually exclusive), preview local MP4s for 5 seconds on hover, open a full-view modal on click for all media kinds, and expose an optional external project link.

**Architecture:** A discriminated union `ProjectMedia` type enforces the "only one asset" rule. A new `ProjectMedia` sub-component renders any of the three kinds (image / local video / YouTube) in three modes (`thumb` / `preview` / `full`). `ProjectCard` remains the orchestrator, owning hover-state, the 5-second timer, the link button, and the modal.

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, framer-motion. No new dependencies. No test runner is configured — validation is `tsc -b`, `eslint`, and manual browser smoke tests. All commands run from `front-end/`.

**Spec:** `docs/superpowers/specs/2026-07-01-project-card-media-design.md`

---

## Conventions

- **Working directory for all commands:** `front-end/`. Every `npm run …` and `git` command below assumes you are in that directory unless stated otherwise.
- **Verification-per-task:** at each commit point run `npm run lint` and `npm run build` (`tsc -b && vite build`) and confirm both pass with zero errors and zero warnings.
- **Commit style:** matches the repo's existing style (`feat:` / `refactor:` / `docs:` prefix, imperative present tense).
- **No test runner in use:** Jest is listed in `package.json` but has no config or tests. Do not add tests. Manual smoke tests happen in Task 7.

---

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `front-end/src/app/data/index.ts` | Modify | Add `ProjectMedia` union, add `link?` and `media?` to `Project`, drop `image?`, migrate existing entry. |
| `front-end/src/app/components/icons/ExternalLinkIcon.tsx` | Create | Small inline-SVG icon used by card overlay and modal body link. |
| `front-end/src/app/components/ProjectMedia.tsx` | Create | Renders any `ProjectMedia` kind in `thumb` / `preview` / `full` mode. Forwards a ref to its `<video>` element (for local video). |
| `front-end/src/app/components/ProjectCard.tsx` | Modify | Orchestrator: media, link overlay, keyboard activation, hover-preview state + timer, reduced-motion / touch handling, modal with cleanup. |
| `front-end/CUSTOMIZATION.md` | Modify | Update the "Projects" data-file section to document `media` and `link`. |

---

## Task 1: Data model — add `ProjectMedia` union, `link`, migrate existing entry

**Files:**
- Modify: `front-end/src/app/data/index.ts`

- [ ] **Step 1: Replace the `Project` interface and migrate the existing entry**

Open `front-end/src/app/data/index.ts` and replace lines 1–7 (the current `Project` interface) with:

```ts
export type ProjectMedia =
	| { kind: 'image'; src: string }
	| { kind: 'video'; src: string; poster?: string }
	| { kind: 'youtube'; videoId: string; poster?: string };

export interface Project {
	title: string;
	tags: string[];
	description?: string;
	note?: string;
	link?: string;
	media?: ProjectMedia;
}
```

Then in the `projects` array (lines 49–57 in the pre-change file), replace the single entry so the whole array reads:

```ts
export const projects: Project[] = [
	{
		title: 'SaaS Analytic Dashboard',
		tags: ['React', 'TypeScript', 'Next.JS', 'PostgreSQL', 'Prisma'],
		media: { kind: 'image', src: '/project/SaaS_dashboard.png' },
		description:
			'A modern SaaS Analytics Dashboard built using React and Next.js, featuring interactive data visualization, user-friendly UI, and customizable widgets to help businesses monitor and analyze key metrics effectively.',
		note: 'Still a work in progress',
	},
];
```

Do not add a `link` yet — the field is optional and no live URL exists.

- [ ] **Step 2: Verify types compile**

Run: `npm run build`
Expected: build fails inside `ProjectCard.tsx` with an error along the lines of `Property 'image' does not exist on type 'Project'`. That is expected — Task 3 fixes it. This step confirms the type change is real.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/data/index.ts
git commit -m "feat(data): add ProjectMedia discriminated union and optional link field"
```

Note: this commit intentionally leaves the build broken because Task 3 changes the consumer in the same PR. If your workflow forbids broken intermediate commits, batch Tasks 1–3 into a single commit.

---

## Task 2: Create `ExternalLinkIcon` component

**Files:**
- Create: `front-end/src/app/components/icons/ExternalLinkIcon.tsx`

- [ ] **Step 1: Write the component**

Create `front-end/src/app/components/icons/ExternalLinkIcon.tsx` with:

```tsx
interface ExternalLinkIconProps {
	className?: string;
}

const ExternalLinkIcon = ({ className }: ExternalLinkIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
	>
		<path d="M15 3h6v6" />
		<path d="M10 14 21 3" />
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
	</svg>
);

export default ExternalLinkIcon;
```

- [ ] **Step 2: Verify lint passes on the new file**

Run: `npx eslint src/app/components/icons/ExternalLinkIcon.tsx --max-warnings 0`
Expected: no output (zero errors, zero warnings).

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/icons/ExternalLinkIcon.tsx
git commit -m "feat(icons): add ExternalLinkIcon inline SVG"
```

---

## Task 3: Create `ProjectMedia` component

**Files:**
- Create: `front-end/src/app/components/ProjectMedia.tsx`

- [ ] **Step 1: Write the component**

Create `front-end/src/app/components/ProjectMedia.tsx` with:

```tsx
import { forwardRef } from 'react';
import type { ProjectMedia as ProjectMediaData } from '../data';

type Mode = 'thumb' | 'preview' | 'full';

interface ProjectMediaProps {
	media: ProjectMediaData | undefined;
	mode: Mode;
	fallbackIndex: number;
	title: string;
}

const youtubeThumbnail = (videoId: string) =>
	`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const NumberedPlaceholder = ({
	index,
	large,
}: {
	index: number;
	large: boolean;
}) => (
	<>
		<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
		<div className="absolute inset-0 flex items-center justify-center">
			<span
				className={`font-syne font-bold text-text/10 group-hover:text-text/20 transition-colors duration-500 select-none ${
					large ? 'text-6xl' : 'text-4xl md:text-5xl'
				}`}
			>
				{String(index + 1).padStart(2, '0')}
			</span>
		</div>
	</>
);

const YoutubeBadge = () => (
	<span className="absolute bottom-3 left-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text bg-black/60 backdrop-blur-sm rounded-pill">
		YouTube
	</span>
);

const ProjectMedia = forwardRef<HTMLVideoElement, ProjectMediaProps>(
	({ media, mode, fallbackIndex, title }, videoRef) => {
		if (!media) {
			return (
				<NumberedPlaceholder index={fallbackIndex} large={mode === 'full'} />
			);
		}

		if (media.kind === 'image') {
			return (
				<img
					src={media.src}
					alt={title}
					className={
						mode === 'full'
							? 'w-full h-full object-cover'
							: 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					}
				/>
			);
		}

		if (media.kind === 'youtube') {
			if (mode === 'full') {
				return (
					<iframe
						src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&rel=0`}
						title={title}
						allow="autoplay; encrypted-media; picture-in-picture"
						allowFullScreen
						className="w-full h-full border-0"
					/>
				);
			}
			return (
				<>
					<img
						src={media.poster ?? youtubeThumbnail(media.videoId)}
						alt={title}
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<YoutubeBadge />
				</>
			);
		}

		if (mode === 'full') {
			return (
				<video
					src={media.src}
					poster={media.poster}
					controls
					autoPlay
					playsInline
					className="w-full h-full object-cover bg-black"
				/>
			);
		}

		const previewSrc = media.src.includes('#')
			? media.src
			: `${media.src}#t=0.1`;

		return (
			<video
				ref={videoRef}
				src={previewSrc}
				poster={media.poster}
				muted
				playsInline
				preload="metadata"
				aria-hidden="true"
				className="absolute inset-0 w-full h-full object-cover"
			/>
		);
	}
);

ProjectMedia.displayName = 'ProjectMedia';

export default ProjectMedia;
```

- [ ] **Step 2: Verify lint passes on the new file**

Run: `npx eslint src/app/components/ProjectMedia.tsx --max-warnings 0`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/ProjectMedia.tsx
git commit -m "feat(components): add ProjectMedia renderer for image, video, youtube"
```

---

## Task 4: Refactor `ProjectCard` structure — use `ProjectMedia`, add link overlay & keyboard activation

Scope of this task: replace `project.image` usages, wire in `ProjectMedia` for card and modal, add the top-right link button, add keyboard activation on the card root. Hover-preview and modal-video cleanup come in Tasks 5 and 6.

**Files:**
- Modify: `front-end/src/app/components/ProjectCard.tsx`

- [ ] **Step 1: Rewrite `ProjectCard.tsx`**

Replace the entire contents of `front-end/src/app/components/ProjectCard.tsx` with:

```tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data';
import ProjectMedia from './ProjectMedia';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface ProjectCardProps {
	project: Project;
	index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [isOpen]);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openModal();
		}
	};

	return (
		<>
			<motion.article
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={openModal}
				onKeyDown={handleCardKeyDown}
				role="button"
				tabIndex={0}
				aria-label={`Open ${project.title} details`}
				className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
			>
				<div className="aspect-[4/3] bg-surface-lighter relative overflow-hidden">
					<ProjectMedia
						media={project.media}
						mode="thumb"
						fallbackIndex={index}
						title={project.title}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-40 group-hover:opacity-55 transition-opacity duration-500 pointer-events-none" />

					{project.link && (
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							aria-label={`Open ${project.title} in a new tab`}
							className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
						>
							<ExternalLinkIcon className="w-4 h-4" />
						</a>
					)}
				</div>

				<div className="p-6">
					<h3 className="font-syne text-xl font-bold text-text group-hover:text-accent transition-colors duration-300">
						{project.title}
					</h3>
					{project.description && (
						<p className="mt-2 text-sm text-text-muted line-clamp-2">
							{project.description}
						</p>
					)}
					<div className="mt-4 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 text-xs text-text-muted bg-surface rounded-pill border border-white/5"
							>
								{tag}
							</span>
						))}
					</div>
					{project.note && (
						<p className="mt-3 text-xs text-accent-muted italic">
							{project.note}
						</p>
					)}
				</div>
			</motion.article>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={closeModal}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-pointer"
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							transition={{ duration: 0.25 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-surface-light cursor-default"
							role="dialog"
							aria-modal="true"
							aria-label={project.title}
						>
							<div className="aspect-video bg-surface-lighter relative overflow-hidden">
								<ProjectMedia
									media={project.media}
									mode="full"
									fallbackIndex={index}
									title={project.title}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-45 pointer-events-none" />
							</div>

							<div className="p-8">
								<h3 className="font-syne text-2xl font-bold text-text">
									{project.title}
								</h3>
								{project.description && (
									<p className="mt-3 text-text-muted leading-relaxed">
										{project.description}
									</p>
								)}
								<div className="mt-5 flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 text-xs text-text-muted bg-surface rounded-pill border border-white/5"
										>
											{tag}
										</span>
									))}
								</div>
								{project.note && (
									<p className="mt-4 text-sm text-accent-muted italic">
										{project.note}
									</p>
								)}
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
							</div>

							<button
								type="button"
								onClick={closeModal}
								className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-text transition-colors"
								aria-label="Close project popup"
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

export default ProjectCard;
```

Note: this task deliberately does NOT wire hover-preview yet. `ProjectMedia` in `mode="thumb"` will render a paused `<video>` for local MP4 entries — the video shows its poster (or first frame) and never plays. Hover playback logic lands in Task 5.

- [ ] **Step 2: Verify build and lint pass**

Run: `npm run build`
Expected: build succeeds. TypeScript errors from Task 1 (`Property 'image' does not exist`) are gone.

Run: `npm run lint`
Expected: zero errors, zero warnings.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/ProjectCard.tsx
git commit -m "refactor(ProjectCard): use ProjectMedia, add link overlay and keyboard activation"
```

---

## Task 5: Add hover-preview logic (5s timer, cleanup, touch, reduced-motion)

**Files:**
- Modify: `front-end/src/app/components/ProjectCard.tsx`

- [ ] **Step 1: Add hover state, ref, and effects**

At the top of `ProjectCard.tsx`, update the imports to include the extra hooks:

```tsx
import { useEffect, useRef, useState } from 'react';
```

Inside the `ProjectCard` component, immediately after the existing `const [isOpen, setIsOpen] = useState(false);` line, add:

```tsx
	const [isHovering, setIsHovering] = useState(false);
	const [supportsHoverPreview, setSupportsHoverPreview] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const stopTimerRef = useRef<number | null>(null);

	const isLocalVideo = project.media?.kind === 'video';

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		);

		const update = () => {
			setSupportsHoverPreview(fineHover.matches && !reducedMotion.matches);
		};

		update();
		fineHover.addEventListener('change', update);
		reducedMotion.addEventListener('change', update);
		return () => {
			fineHover.removeEventListener('change', update);
			reducedMotion.removeEventListener('change', update);
		};
	}, []);

	const clearStopTimer = () => {
		if (stopTimerRef.current !== null) {
			window.clearTimeout(stopTimerRef.current);
			stopTimerRef.current = null;
		}
	};

	const startHoverPreview = () => {
		if (!supportsHoverPreview || !isLocalVideo) return;
		setIsHovering(true);
		const video = videoRef.current;
		if (!video) return;
		video.currentTime = 0;
		const playPromise = video.play();
		if (playPromise && typeof playPromise.catch === 'function') {
			playPromise.catch(() => {
				/* autoplay may be blocked; silently ignore */
			});
		}
		clearStopTimer();
		stopTimerRef.current = window.setTimeout(() => {
			const v = videoRef.current;
			if (v) {
				v.pause();
				v.currentTime = 0;
			}
		}, 5000);
	};

	const stopHoverPreview = () => {
		if (!supportsHoverPreview || !isLocalVideo) return;
		clearStopTimer();
		const video = videoRef.current;
		if (video) {
			video.pause();
			video.currentTime = 0;
		}
		setIsHovering(false);
	};

	useEffect(() => {
		return () => {
			clearStopTimer();
			const v = videoRef.current;
			if (v) v.pause();
		};
	}, []);
```

- [ ] **Step 2: Wire the hover handlers and the ref onto the card**

Update the `<motion.article>` opening tag: add `onMouseEnter={startHoverPreview}` and `onMouseLeave={stopHoverPreview}` alongside the existing `onClick={openModal}` / `onKeyDown={handleCardKeyDown}`. The tag should look like:

```tsx
			<motion.article
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={openModal}
				onKeyDown={handleCardKeyDown}
				onMouseEnter={startHoverPreview}
				onMouseLeave={stopHoverPreview}
				role="button"
				tabIndex={0}
				aria-label={`Open ${project.title} details`}
				className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
			>
```

Then in the card's media area, pass the ref to the thumb `<ProjectMedia>`:

```tsx
					<ProjectMedia
						ref={videoRef}
						media={project.media}
						mode="thumb"
						fallbackIndex={index}
						title={project.title}
					/>
```

`isHovering` is intentionally not read here — the ref-driven `play()`/`pause()` calls are enough because `ProjectMedia` in `thumb` mode always mounts the same paused `<video>` element for local video kind. `isHovering` is retained in state only in case future styling (e.g. a "playing" overlay) needs it; if unused it will be flagged by ESLint (`@typescript-eslint/no-unused-vars`). To keep the lint clean without adding cosmetic UI right now, use `isHovering` as a data attribute on the article so the state is observable in the DOM:

Add `data-previewing={isHovering}` to the `<motion.article>` props. Final tag:

```tsx
			<motion.article
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={openModal}
				onKeyDown={handleCardKeyDown}
				onMouseEnter={startHoverPreview}
				onMouseLeave={stopHoverPreview}
				role="button"
				tabIndex={0}
				aria-label={`Open ${project.title} details`}
				data-previewing={isHovering}
				className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
			>
```

- [ ] **Step 3: Verify build and lint pass**

Run: `npm run build`
Expected: success, no TypeScript errors.

Run: `npm run lint`
Expected: zero errors, zero warnings. If lint flags `isHovering` or `setIsHovering` as unused, ensure the `data-previewing` attribute is present — that reads the state.

- [ ] **Step 4: Commit**

```bash
git add front-end/src/app/components/ProjectCard.tsx
git commit -m "feat(ProjectCard): add 5s hover preview for local video with reduced-motion and touch guards"
```

---

## Task 6: Modal cleanup — pause video/iframe on close

The modal already renders `<ProjectMedia mode="full">` from Task 4 (which auto-plays local video and autoplays the YouTube iframe). What's missing: when the user closes the modal while a video is playing, the `AnimatePresence` unmount is not synchronous — during the 250ms exit animation the `<video>` keeps playing with sound. Add an explicit pause when `isOpen` flips to `false`.

**Files:**
- Modify: `front-end/src/app/components/ProjectCard.tsx`

- [ ] **Step 1: Add a ref for the modal video and pause it on close**

Below the existing `videoRef` declaration in `ProjectCard`, add:

```tsx
	const modalVideoRef = useRef<HTMLVideoElement>(null);
```

Update the modal's `<ProjectMedia mode="full" ...>` element to forward the ref:

```tsx
								<ProjectMedia
									ref={modalVideoRef}
									media={project.media}
									mode="full"
									fallbackIndex={index}
									title={project.title}
								/>
```

`ProjectMedia`'s `forwardRef` already targets its `<video>` element. In `full` mode for the `image` and `youtube` kinds the ref simply won't attach to anything — `forwardRef` accepts an unused ref silently, so no change to `ProjectMedia` is needed. Verify this by re-reading `ProjectMedia.tsx`: the ref is only spread onto the preview `<video>`. To also expose the full-mode `<video>`, update `ProjectMedia.tsx` — spread `ref={videoRef}` onto the full-mode local `<video>` element too:

Change the `mode === 'full'` local-video branch inside `ProjectMedia.tsx` from:

```tsx
			return (
				<video
					src={media.src}
					poster={media.poster}
					controls
					autoPlay
					playsInline
					className="w-full h-full object-cover bg-black"
				/>
			);
```

to:

```tsx
			return (
				<video
					ref={videoRef}
					src={media.src}
					poster={media.poster}
					controls
					autoPlay
					playsInline
					className="w-full h-full object-cover bg-black"
				/>
			);
```

Back in `ProjectCard.tsx`, add an effect that pauses the modal video when the modal transitions to closed:

```tsx
	useEffect(() => {
		if (isOpen) return;
		const v = modalVideoRef.current;
		if (v) {
			v.pause();
			v.currentTime = 0;
		}
	}, [isOpen]);
```

For YouTube: the `<iframe>` is inside the `AnimatePresence` branch that mounts only while `isOpen` is true, so the iframe unmounts on close and audio stops naturally. No extra work needed.

- [ ] **Step 2: Verify build and lint pass**

Run: `npm run build`
Expected: success.

Run: `npm run lint`
Expected: zero errors, zero warnings.

- [ ] **Step 3: Commit**

```bash
git add front-end/src/app/components/ProjectCard.tsx front-end/src/app/components/ProjectMedia.tsx
git commit -m "fix(ProjectCard): pause modal video on close to prevent audio bleed"
```

---

## Task 7: Manual smoke test with temporary sample entries

This task validates all three media kinds and the link button in a real browser. Sample assets are added temporarily and removed before finishing.

**Files:**
- Modify (temporary): `front-end/src/app/data/index.ts`
- Add (temporary): `front-end/public/project/sample.mp4` — any short MP4 you have locally (5–15 seconds is ideal)
- Add (optional temporary): `front-end/public/project/sample_poster.jpg`

- [ ] **Step 1: Drop a sample MP4 into `public/project/`**

Copy any short MP4 you have handy to `front-end/public/project/sample.mp4`. If you don't have one, download a small public sample (`curl -o front-end/public/project/sample.mp4 https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4`). You can also drop a matching JPG at `front-end/public/project/sample_poster.jpg` to test the explicit poster path.

- [ ] **Step 2: Add three temporary sample entries**

In `front-end/src/app/data/index.ts`, temporarily replace the `projects` array with:

```ts
export const projects: Project[] = [
	{
		title: 'SaaS Analytic Dashboard',
		tags: ['React', 'TypeScript', 'Next.JS', 'PostgreSQL', 'Prisma'],
		media: { kind: 'image', src: '/project/SaaS_dashboard.png' },
		link: 'https://example.com',
		description:
			'A modern SaaS Analytics Dashboard built using React and Next.js, featuring interactive data visualization, user-friendly UI, and customizable widgets to help businesses monitor and analyze key metrics effectively.',
		note: 'Still a work in progress',
	},
	{
		title: '[TEST] Local video card',
		tags: ['MP4', 'Hover preview'],
		media: {
			kind: 'video',
			src: '/project/sample.mp4',
			poster: '/project/sample_poster.jpg',
		},
		description: 'Temporary entry for verifying local-MP4 hover preview.',
	},
	{
		title: '[TEST] YouTube card',
		tags: ['YouTube', 'Iframe'],
		media: { kind: 'youtube', videoId: 'dQw4w9WgXcQ' },
		link: 'https://youtube.com',
		description: 'Temporary entry for verifying YouTube modal embed.',
	},
];
```

- [ ] **Step 3: Run the dev server and execute the smoke-test checklist**

Run: `npm run dev`
Then open http://localhost:5173/#work in a desktop browser (Chrome or Firefox) and verify each item:

1. **Image card (existing dashboard)** — resting: static image visible. Hover: image zooms (existing behavior), link icon fades in top-right. Click link icon: opens `https://example.com` in a new tab, modal does NOT open. Click card body: modal opens with the same image. Close modal (ESC and backdrop-click both work).
2. **Local MP4 card** — resting: shows `sample_poster.jpg`. Hover: video starts playing muted, stops and returns to poster after exactly ~5 seconds even if still hovering. Move mouse away before 5s: video stops and resets immediately. Click card: modal opens with a `<video controls>` playing with audio. Close modal: audio stops within the exit animation (no bleed).
3. **YouTube card** — resting: YouTube thumbnail with "YouTube" pill in bottom-left. Hover: no video plays. Click card: modal opens with an autoplaying YouTube embed. Close modal: iframe unmounts, no lingering audio.
4. **Keyboard** — Tab through the section. Each card receives a visible focus ring. Enter or Space opens the modal. Tab to the link icon (visible on focus even without hover) and press Enter to open the URL in a new tab. In modal: Tab lands on the "Visit project" link and the close button; ESC closes.
5. **Touch simulation** — Open Chrome DevTools → toggle device toolbar (mobile). Reload. Tap the local-MP4 card: modal opens directly (no inline preview). Tap the link icon on the image card: URL opens; modal does not.
6. **Reduced motion** — In DevTools: Command menu → "Emulate CSS prefers-reduced-motion: reduce". Hover the MP4 card: no playback occurs, poster stays static. Modal video still plays on click (intentional).
7. **Modal cleanup regression check** — Open the MP4 modal, let audio play, close the modal by clicking the backdrop. Confirm audio silences within the 250ms exit animation.

If any check fails, stop and fix the underlying bug before continuing. Do not commit the temporary entries.

- [ ] **Step 4: Revert temporary entries**

Restore `projects` in `front-end/src/app/data/index.ts` back to the single real entry from Task 1. Delete the sample files:

```bash
rm front-end/public/project/sample.mp4
rm -f front-end/public/project/sample_poster.jpg
```

Verify with `git status` that only real changes remain (no `sample.mp4`, no test entries in `data/index.ts`).

- [ ] **Step 5: Final build and lint**

Run: `npm run build`
Run: `npm run lint`
Both must succeed with zero errors and zero warnings.

- [ ] **Step 6: No commit if nothing changed**

If Steps 3–5 required no code fixes, there is nothing to commit for this task. If bug fixes were made, commit them with a descriptive `fix(ProjectCard): …` message.

---

## Task 8: Update `CUSTOMIZATION.md`

**Files:**
- Modify: `front-end/CUSTOMIZATION.md`

- [ ] **Step 1: Update the Projects data-file section**

In `front-end/CUSTOMIZATION.md`, replace the entire "#### Projects" block (currently lines 90–110 in the pre-change file — the TypeScript block starting `export const projects: Project[]` and the "You can:" bullet list under it) with:

````markdown
#### Projects

```typescript
export const projects: Project[] = [
  {
    title: 'My Real Project',          // Project name
    tags: ['React', 'TypeScript'],      // Technology/category tags
    description: 'What this project does...', // Short summary (optional)
    note: 'Built at Company X',         // Extra context shown in italic (optional)
    link: 'https://myproject.com',      // External URL (optional; shows link icon on card)
    media: { kind: 'image', src: '/project/screenshot.png' }, // See below (optional)
  },
  // Add, remove, or reorder entries freely
];
```

**The `media` field** is a discriminated union — set exactly one of these shapes:

```typescript
// Static image
media: { kind: 'image', src: '/project/screenshot.png' }

// Self-hosted MP4 in public/project/
// `poster` is optional; if omitted, the video's first frame is used
media: { kind: 'video', src: '/project/demo.mp4', poster: '/project/demo_poster.jpg' }

// YouTube embed (use the video ID from the URL, not the full URL)
// `poster` overrides the auto-fetched YouTube thumbnail
media: { kind: 'youtube', videoId: 'dQw4w9WgXcQ' }
```

- **Local videos** auto-play muted for 5 seconds when hovered on desktop, then reset to the poster. Clicking opens the full video with controls and audio. Hover preview is skipped on touch devices and when `prefers-reduced-motion: reduce` is set.
- **YouTube cards** show a static thumbnail with a "YouTube" badge; clicking opens an autoplaying embed in the modal. No hover preview.
- **Omit `media` entirely** to fall back to the numbered placeholder card (`01`, `02`, …).

**You can:**
- Add unlimited projects — the grid auto-adjusts (1 col mobile, 2 col tablet, 3 col desktop)
- Remove projects by deleting entries
- Reorder by rearranging the array
- Modify any field (`title`, `tags`, `description`, `note`, `link`, `media`)
````

- [ ] **Step 2: Update the "Project images" row in the "Things You Could Add" table**

In the same file, find the row starting `| **Project images** | Low |` (in the "Things You Could Add" table) and delete that row entirely — the feature is now implemented.

- [ ] **Step 3: Commit**

```bash
git add front-end/CUSTOMIZATION.md
git commit -m "docs: document new media field and link for project cards"
```

---

## Final verification

- [ ] **Step 1: Run the full checks one last time**

Run: `npm run lint`
Expected: zero errors, zero warnings.

Run: `npm run build`
Expected: success, `dist/` is produced.

- [ ] **Step 2: Confirm git history is clean**

Run: `git log --oneline main..HEAD` (or whichever base branch)
Expected: a short focused series of commits — data model, icon, ProjectMedia, ProjectCard refactor, hover preview, modal cleanup, docs (and any fix commits from Task 7).

Run: `git status`
Expected: clean working tree, no `sample.mp4`, no test entries.

- [ ] **Step 3: Ready to open a PR**
