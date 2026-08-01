import { motion } from 'framer-motion';
import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path (e.g. '/work-illustration.png').
const workImage: string | undefined = undefined;

const Work = () => {
	return (
		<SectionShell
			id="work"
			tint="chartreuse"
			image={{ src: workImage, placement: 'corner', corner: 'top-right', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-7xl mx-auto">
				<div className="mb-16 max-w-2xl">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
					>
						<span className="h-px w-6 bg-accent/60" />
						Selected work
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="font-syne text-headline"
					>
						My latest{' '}
						<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
							projects
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-3 text-text-muted text-lg"
					>
						A handful of things I've designed and shipped recently.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project, i) => (
						<ProjectCard key={project.title} project={project} index={i} />
					))}
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-16 text-center text-text-muted text-lg"
				>
					New cases are on the way,{' '}
					<span className="font-medium text-text">slowly but surely.</span>
				</motion.p>
			</div>
		</SectionShell>
	);
};

export default Work;
