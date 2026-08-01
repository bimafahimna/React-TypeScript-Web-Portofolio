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

	const openModal = () => {
		setSlideIndex(0);
		setSlideDir(0);
		setIsOpen(true);
	};
	const closeModal = useCallback(() => {
		pauseCurrentSlideVideo();
		setIsOpen(false);
	}, [pauseCurrentSlideVideo]);

	useEffect(() => {
		if (isOpen) return;
		const v = slideVideoRef.current;
		if (v) {
			v.pause();
			v.currentTime = 0;
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
	}, [isOpen, carouselEnabled, goPrev, goNext, closeModal]);

	useEffect(() => {
		return () => {
			const v = slideVideoRef.current;
			if (v) {
				v.pause();
				v.currentTime = 0;
			}
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

	const slideAltFor = (i: number) => `${hobby.title}, ${i + 1} of ${assets.length}`;

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
											‹
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
											›
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
