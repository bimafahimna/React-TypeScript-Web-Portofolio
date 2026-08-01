import { motion } from 'framer-motion';

/**
 * PageLoader
 * ----------
 * Full-viewport splash shown while the hero photo (and anything else the
 * initial render depends on) is still loading. Kept intentionally quiet so
 * it feels like a natural fade-in rather than a hard loading screen.
 */
const PageLoader = () => {
	return (
		<div
			role="status"
			aria-live="polite"
			aria-label="Loading portfolio"
			className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-light"
		>
			<div className="flex flex-col items-center gap-4">
				<motion.div
					aria-hidden
					className="w-10 h-10 rounded-full border-2 border-accent/20 border-t-accent"
					animate={{ rotate: 360 }}
					transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
				/>
				<span className="font-syne font-semibold text-text tracking-tight text-sm">
					BF
				</span>
			</div>
		</div>
	);
};

export default PageLoader;
