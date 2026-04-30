import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data';

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

	return (
		<>
			<motion.article
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={() => setIsOpen(true)}
				className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer"
			>
				<div className="aspect-[4/3] bg-surface-lighter relative overflow-hidden">
					{project.image ? (
						<img
							src={project.image}
							alt={project.title}
							className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
					) : (
						<>
							<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="font-syne text-4xl md:text-5xl font-bold text-text/10 group-hover:text-text/20 transition-colors duration-500 select-none">
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>
						</>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-40 group-hover:opacity-55 transition-opacity duration-500" />
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
						<p className="mt-3 text-xs text-accent-muted italic">{project.note}</p>
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
						onClick={() => setIsOpen(false)}
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
								{project.image ? (
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="font-syne text-6xl font-bold text-text/10 select-none">
											{String(index + 1).padStart(2, '0')}
										</span>
									</div>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-45" />
							</div>

							<div className="p-8">
								<h3 className="font-syne text-2xl font-bold text-text">{project.title}</h3>
								{project.description && (
									<p className="mt-3 text-text-muted leading-relaxed">{project.description}</p>
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
									<p className="mt-4 text-sm text-accent-muted italic">{project.note}</p>
								)}
							</div>

							<button
								type="button"
								onClick={() => setIsOpen(false)}
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
