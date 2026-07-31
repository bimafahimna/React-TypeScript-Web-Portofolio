import { motion, useReducedMotion } from 'framer-motion';

export type SectionImagePlacement = 'corner' | 'side' | 'watermark';
export type SectionImageCorner =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right';
export type SectionImageSide = 'left' | 'right';

export interface SectionImageProps {
	src?: string;
	alt?: string;
	placement?: SectionImagePlacement;
	side?: SectionImageSide;
	corner?: SectionImageCorner;
	/** Extra classes appended to the wrapper (useful for one-off tweaks). */
	className?: string;
	/** Override the default width class (e.g. 'w-40 md:w-56'). */
	sizeClassName?: string;
	/** Disable the gentle floating motion. */
	float?: boolean;
}

/**
 * SectionImage
 * ------------
 * A decorative, transparent-PNG-friendly image slot for a section. It's
 * absolutely positioned inside a `relative` parent (see `SectionShell`) and
 * always sits behind the content (`z-0`, `pointer-events-none`).
 *
 * Renders `null` when `src` is not provided, so it's a truly invisible slot
 * until you drop in an image.
 *
 * Placements:
 *   - `corner`     small sticker in one of the four corners
 *   - `side`       ~1/3 width illustration hugging left or right edge
 *                  (hidden on mobile to keep the layout readable)
 *   - `watermark`  large, low-opacity, centered behind everything
 */
const CORNER_POS: Record<SectionImageCorner, string> = {
	'top-left': 'top-6 left-6 md:top-10 md:left-10',
	'top-right': 'top-6 right-6 md:top-10 md:right-10',
	'bottom-left': 'bottom-6 left-6 md:bottom-10 md:left-10',
	'bottom-right': 'bottom-6 right-6 md:bottom-10 md:right-10',
};

const SectionImage = ({
	src,
	alt = '',
	placement = 'corner',
	side = 'right',
	corner = 'top-right',
	className = '',
	sizeClassName,
	float = true,
}: SectionImageProps) => {
	const prefersReducedMotion = useReducedMotion();
	if (!src) return null;

	let positionClasses = '';
	let defaultSize = '';
	let extra = '';

	if (placement === 'corner') {
		positionClasses = `absolute ${CORNER_POS[corner]}`;
		defaultSize = 'w-28 md:w-40';
	} else if (placement === 'side') {
		positionClasses = `absolute top-1/2 -translate-y-1/2 ${
			side === 'left' ? 'left-0 md:-left-8' : 'right-0 md:-right-8'
		} hidden lg:block`;
		defaultSize = 'w-1/3 max-w-md';
	} else {
		// watermark
		positionClasses = 'absolute inset-0 flex items-center justify-center';
		defaultSize = 'w-2/3 max-w-3xl';
		extra = 'opacity-[0.06]';
	}

	const sizeCls = sizeClassName ?? defaultSize;
	const floatAnim = float && !prefersReducedMotion
		? { y: [0, -10, 0] }
		: undefined;

	return (
		<div
			aria-hidden
			className={`${positionClasses} pointer-events-none z-0 ${extra} ${className}`}
		>
			<motion.img
				src={src}
				alt={alt}
				animate={floatAnim}
				transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
				className={`${sizeCls} h-auto object-contain drop-shadow-xl`}
			/>
		</div>
	);
};

export default SectionImage;
