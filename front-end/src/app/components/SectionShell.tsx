import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import SectionImage, { type SectionImageProps } from './SectionImage';

export type SectionTint =
	| 'default'
	| 'paper'
	| 'cream'
	| 'mint'
	| 'teal'
	| 'chartreuse';

interface SectionShellProps {
	id?: string;
	tint?: SectionTint;
	image?: SectionImageProps;
	className?: string;
	/** Optional eyebrow label rendered above `children` (small colored kicker). */
	eyebrow?: string;
	children: ReactNode;
}

// Static class map so Tailwind's JIT can see every possible value.
const TINT_CLASSES: Record<SectionTint, string> = {
	default: 'bg-surface',
	paper: 'bg-surface-light',
	cream: 'bg-surface-lighter',
	mint: 'bg-accent-muted/10',
	teal: 'bg-accent/[0.06]',
	chartreuse: 'bg-accent-warm/20',
};

/**
 * SectionShell
 * ------------
 * Standard section wrapper. Handles:
 *   - tinted background band (part of the coastal palette)
 *   - relative + overflow-hidden so decorative images can be absolutely
 *     positioned inside without leaking out
 *   - optional decorative `SectionImage` (invisible when `src` is not set)
 *   - optional eyebrow label
 *   - reveal-on-scroll animation (same behavior as the old AnimatedSection)
 *
 * Each section keeps its own inner content/layout — this shell only cares
 * about the surrounding chrome.
 */
const SectionShell = ({
	id,
	tint = 'default',
	image,
	className = '',
	eyebrow,
	children,
}: SectionShellProps) => {
	return (
		<motion.section
			id={id}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.6 }}
			className={`relative overflow-hidden section-padding ${TINT_CLASSES[tint]} ${className}`}
		>
			{image ? <SectionImage {...image} /> : null}

			<div className="relative z-10">
				{eyebrow ? (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="mb-4 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
					>
						<span className="h-px w-6 bg-accent/60" />
						{eyebrow}
					</motion.p>
				) : null}
				{children}
			</div>
		</motion.section>
	);
};

export default SectionShell;
