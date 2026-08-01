import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface WordCarouselProps {
	words: string[];
	/** Time each word stays on screen (ms). Default 2400. */
	interval?: number;
	/** Classes applied to the animated word slot. */
	className?: string;
	/** Classes applied to the article ("a" / "an") slot. */
	articleClassName?: string;
}

// Simple vowel-start heuristic. Edit here if you add words like "hour".
const articleFor = (word: string): 'a' | 'an' =>
	/^[aeiou]/i.test(word.trim()) ? 'an' : 'a';

const EASE = [0.32, 0.72, 0, 1] as const;
const DURATION = 0.55;
// Row height in em. Must be > 1 so descenders (p, g, y, j, q) aren't clipped
// by the overflow-hidden window. Every place we measure a "row" uses this.
const ROW_EM = 1.35;

/**
 * A vertical marquee slot. Renders `items` stacked one per `1em` row, then
 * translates the whole column so the row at `targetIndex` sits in the visible
 * window (which is itself exactly `1em` tall and clipped with overflow-hidden).
 *
 * Wrap-around is seamless: internally the strip duplicates the first item at
 * the end, so scrolling past the last real item animates onto a visually
 * identical first item, then silently snaps back to index 0 without motion.
 * That way the marquee never "flies back down" when cycling.
 *
 * If `targetIndex` doesn't change between renders, nothing animates.
 */
const MarqueeSlot = ({
	items,
	targetIndex,
	className,
}: {
	items: string[];
	targetIndex: number;
	className?: string;
}) => {
	const [displayIndex, setDisplayIndex] = useState(targetIndex);
	const [animate, setAnimate] = useState(false);
	const lastTargetRef = useRef(targetIndex);

	// React to targetIndex changes from the parent.
	useEffect(() => {
		if (targetIndex === lastTargetRef.current) return;
		lastTargetRef.current = targetIndex;

		setAnimate(true);
		setDisplayIndex((current) => {
			const currentReal = current % items.length;
			if (targetIndex === currentReal) return current;
			// If we're wrapping (moving to a lower index), advance onto the
			// duplicated first slot so the motion is always forward/upward.
			if (targetIndex < currentReal) return items.length;
			return targetIndex;
		});
	}, [targetIndex, items.length]);

	// After finishing the animation onto the duplicated slot, snap back to 0.
	const handleAnimationComplete = () => {
		if (displayIndex >= items.length) {
			setAnimate(false);
			setDisplayIndex(0);
		}
	};

	const strip = [...items, items[0]];

	return (
		<span
			className="relative inline-block overflow-hidden align-baseline"
			style={{ height: `${ROW_EM}em`, lineHeight: ROW_EM }}
		>
			<motion.span
				className="flex flex-col"
				animate={{ y: `-${displayIndex * ROW_EM}em` }}
				transition={animate ? { duration: DURATION, ease: EASE } : { duration: 0 }}
				onAnimationComplete={handleAnimationComplete}
			>
				{strip.map((item, i) => (
					<span
						key={`${item}-${i}`}
						className={`block whitespace-nowrap ${className ?? ''}`}
						style={{ height: `${ROW_EM}em`, lineHeight: ROW_EM }}
					>
						{item}
					</span>
				))}
			</motion.span>
		</span>
	);
};

/**
 * Rotates through a list of descriptive words with a slot-machine style
 * vertical scroll (always upward). Both the article ("a" / "an") and the
 * word use the same MarqueeSlot mechanism, so the motion is identical.
 *
 * The article only animates when the article actually changes between
 * rotations (the slot's targetIndex stays the same otherwise).
 *
 * Respects `prefers-reduced-motion` (renders the first word statically).
 */
const WordCarousel = ({
	words,
	interval = 2400,
	className = '',
	articleClassName = '',
}: WordCarouselProps) => {
	const [index, setIndex] = useState(0);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (words.length <= 1 || prefersReducedMotion) return;
		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % words.length);
		}, interval);
		return () => window.clearInterval(id);
	}, [words.length, interval, prefersReducedMotion]);

	if (words.length === 0) return null;

	const current = words[index];
	const article = articleFor(current);

	if (prefersReducedMotion) {
		return (
			<span>
				<span className={articleClassName}>{article}</span>{''}
				<span className={className}>{current}</span>
			</span>
		);
	}

	return (
		<span className="inline-flex items-baseline gap-[0.3em] align-baseline">
			<MarqueeSlot
				items={['a', 'an']}
				targetIndex={article === 'an' ? 1 : 0}
				className={articleClassName}
			/>
			<MarqueeSlot
				items={words}
				targetIndex={index}
				className={className}
			/>
		</span>
	);
};

export default WordCarousel;
