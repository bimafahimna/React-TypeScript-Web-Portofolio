import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
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
		const v = videoRef.current;
		return () => {
			clearStopTimer();
			if (v) v.pause();
		};
	}, []);

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

	const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
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
				onMouseEnter={startHoverPreview}
				onMouseLeave={stopHoverPreview}
				role="button"
				tabIndex={0}
				aria-label={`Open ${project.title} details`}
				data-previewing={isHovering}
				className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
			>
				<div className="aspect-[4/3] bg-surface-lighter relative overflow-hidden">
					<ProjectMedia
						ref={videoRef}
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
