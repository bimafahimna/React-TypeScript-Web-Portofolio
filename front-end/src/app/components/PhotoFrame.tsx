import { useState } from 'react';

type FrameShape = 'circle' | 'rectangle';

interface PhotoFrameProps {
	src?: string;
	alt?: string;
	initials?: string;
	shape?: FrameShape;
	className?: string;
}

/**
 * PhotoFrame
 * ----------
 * Reusable framed avatar / portrait.
 *
 * - Pass `src` to render your photo (drop the file in /public and reference it
 *   as e.g. "/me.jpg"). If `src` is missing OR the image fails to load, it
 *   falls back to a gradient tile with your `initials`.
 * - Switch between `shape="rectangle"` (rounded portrait card, default) and
 *   `shape="circle"` (classic avatar). No other markup changes needed.
 */
const PhotoFrame = ({
	src,
	alt = 'Profile photo',
	initials = 'BF',
	shape = 'rectangle',
	className = '',
}: PhotoFrameProps) => {
	const [failed, setFailed] = useState(false);
	const showPhoto = Boolean(src) && !failed;

	const shapeClasses =
		shape === 'circle'
			? 'rounded-full aspect-square'
			: 'rounded-[2rem] aspect-[4/5]';

	return (
		<div className={`relative ${className}`}>
			{/* Soft glow behind the frame — gives depth without a hard shadow. */}
			<div
				aria-hidden
				className={`absolute -inset-6 bg-gradient-to-br from-accent/30 via-accent-muted/20 to-accent-warm/30 blur-2xl opacity-70 ${
					shape === 'circle' ? 'rounded-full' : 'rounded-[2.5rem]'
				}`}
			/>

			{/* Decorative offset outline — subtle "layered" feel. */}
			<div
				aria-hidden
				className={`absolute inset-0 translate-x-3 translate-y-3 border border-accent/30 ${shapeClasses}`}
			/>

			<div
				className={`relative overflow-hidden border border-text/10 bg-surface-lighter shadow-xl shadow-accent/10 ${shapeClasses}`}
			>
				{showPhoto ? (
					<img
						src={src}
						alt={alt}
						onError={() => setFailed(true)}
						loading="eager"
						decoding="async"
						{...({ fetchpriority: 'high' } as Record<string, string>)}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent via-accent-muted to-accent-warm">
						<span className="font-syne font-semibold text-text-dark text-6xl md:text-7xl tracking-tight select-none">
							{initials}
						</span>
					</div>
				)}
			</div>

		</div>
	);
};

export default PhotoFrame;
