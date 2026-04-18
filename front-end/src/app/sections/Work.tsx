import { motion } from 'framer-motion';
import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';

const Work = () => {
	return (
		<AnimatedSection id="work" className="section-padding">
			<div className="max-w-7xl mx-auto">
				<div className="mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="font-syne text-headline"
					>
						My latest work
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-3 text-text-muted text-lg"
					>
						from 2020 &apos;til today
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
					New cases are on the way, <span className="font-medium text-text">slowly but surely</span>
				</motion.p>
			</div>
		</AnimatedSection>
	);
};

export default Work;
