import { motion } from 'framer-motion';
import { experiences } from '../data';
import AnimatedSection from '../components/AnimatedSection';

const Experience = () => {
	return (
		<AnimatedSection className="section-padding bg-surface-light">
			<div className="max-w-4xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-4"
				>
					Every experience is important
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-text-muted text-lg mb-16"
				>
					and has taught me a lot
				</motion.p>

				<div className="space-y-0">
					{experiences.map((exp, i) => (
						<motion.div
							key={exp.company}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-accent/20 transition-colors"
						>
							<div>
								<h3 className="font-syne text-xl font-bold text-text group-hover:text-accent transition-colors">
									{exp.company}
								</h3>
								<p className="text-sm text-text-muted mt-1">{exp.role}</p>
							</div>
							<span className="text-sm text-text-muted font-mono">
								{exp.period}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Experience;
