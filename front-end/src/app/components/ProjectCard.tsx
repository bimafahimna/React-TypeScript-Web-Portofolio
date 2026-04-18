import { motion } from 'framer-motion';
import type { Project } from '../data';

interface ProjectCardProps {
	project: Project;
	index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
	return (
		<motion.article
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-60px' }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="group relative overflow-hidden rounded-2xl bg-surface-light cursor-pointer"
		>
			<div className="aspect-[4/3] bg-surface-lighter relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="font-syne text-4xl md:text-5xl font-bold text-text/10 group-hover:text-text/20 transition-colors duration-500 select-none">
						{String(index + 1).padStart(2, '0')}
					</span>
				</div>
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
	);
};

export default ProjectCard;
