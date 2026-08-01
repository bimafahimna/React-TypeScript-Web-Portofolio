import { useEffect, useState } from 'react';

/**
 * useImageReady
 * -------------
 * Preloads an image and resolves `ready` once it has fully loaded (or failed,
 * so a broken URL never blocks the UI forever). Uses the browser's decoder
 * when available so the render frame that unhides the UI won't stall.
 *
 * Safe with SSR: reads `window` only inside effect.
 */
export const useImageReady = (src: string | undefined | null): boolean => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!src) {
			setReady(true);
			return;
		}

		let cancelled = false;
		const done = () => {
			if (!cancelled) setReady(true);
		};

		const img = new Image();
		img.src = src;

		// Prefer decode() so we don't unhide the UI on a not-yet-decoded frame.
		if (typeof img.decode === 'function') {
			img.decode().then(done).catch(done);
		} else {
			img.onload = done;
			img.onerror = done;
		}

		return () => {
			cancelled = true;
		};
	}, [src]);

	return ready;
};

export default useImageReady;
