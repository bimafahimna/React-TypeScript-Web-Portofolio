import { useEffect, useRef, useState } from 'react';

export interface SectionAssetGroup {
	/** DOM id of the section this group belongs to (must match `<section id="...">`). */
	id: string;
	/**
	 * Media URLs to preload when the user is within `radius` sections of this
	 * one. Images and videos are both supported (kind is detected by file
	 * extension).
	 */
	urls: string[];
}

// File extensions that should be treated as video for preload purposes.
const VIDEO_EXTENSION = /\.(mp4|mov|webm|ogg|m4v)(\?|#|$)/i;

const preloadUrl = (url: string) => {
	if (!url) return;
	if (VIDEO_EXTENSION.test(url)) {
		// Use a resource hint so the browser downloads the video into its HTTP
		// cache; the actual <video> element will then reuse the cached bytes.
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'video';
		link.href = url;
		document.head.appendChild(link);
	} else {
		const img = new Image();
		img.decoding = 'async';
		img.src = url;
	}
};

interface ImagePreloaderProps {
	/** Ordered list of section asset groups, top-to-bottom on the page. */
	sections: SectionAssetGroup[];
	/**
	 * How many sections away from the current one to eagerly preload
	 * (in both directions). Defaults to 2.
	 */
	radius?: number;
}

/**
 * Proximity-based image preloader.
 *
 * Watches which section is currently in view (via IntersectionObserver) and
 * kicks off cache-warming downloads for images belonging to sections within
 * `radius` of it. On first mount, the initial section (index 0) already
 * triggers preloads for sections 0..radius, so the first couple of scrolls
 * feel instant without wasting bandwidth on far-away assets.
 *
 * Renders nothing.
 */
const ImagePreloader = ({ sections, radius = 2 }: ImagePreloaderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const preloadedRef = useRef<Set<string>>(new Set());

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length === 0) return;
				const top = visible.reduce((a, b) =>
					a.intersectionRatio >= b.intersectionRatio ? a : b
				);
				const idx = sections.findIndex((s) => s.id === top.target.id);
				if (idx >= 0) setCurrentIndex(idx);
			},
			// A generous top margin biases the "current" section toward what the
			// user is actually reading, not just what's barely visible at the edge.
			{ rootMargin: '-30% 0px -30% 0px', threshold: [0, 0.25, 0.5] }
		);

		sections.forEach((s) => {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [sections]);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (sections.length === 0) return;

		const start = Math.max(0, currentIndex - radius);
		const end = Math.min(sections.length - 1, currentIndex + radius);

		const preload = () => {
			for (let i = start; i <= end; i++) {
				sections[i].urls.forEach((url) => {
					if (!url) return;
					if (preloadedRef.current.has(url)) return;
					preloadedRef.current.add(url);
					preloadUrl(url);
				});
			}
		};

		// Defer to idle time so we never fight the current section's own paint.
		const w = window as Window & {
			requestIdleCallback?: (cb: () => void) => number;
		};
		if (typeof w.requestIdleCallback === 'function') {
			w.requestIdleCallback(preload);
		} else {
			setTimeout(preload, 150);
		}
	}, [currentIndex, radius, sections]);

	return null;
};

export default ImagePreloader;
