import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const Story = () => {
	return (
		<AnimatedSection id="story" className="section-padding">
			<div className="max-w-5xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-16"
				>
					I don&apos;t have dark secrets,
					<br />
					<span className="gradient-text">only bright ones</span>
				</motion.h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div className="space-y-6">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							My journey into tech started with curiosity and a love for building
							things. What began as tinkering with code turned into a passion
							for creating digital experiences that are both beautiful and
							functional.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							Today, I craft web solutions for teams and founders who care
							about the details — from pixel-perfect interfaces to performant,
							accessible code.
						</motion.p>
					</div>

					<div className="space-y-6">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							I partner with dynamic teams reinventing tomorrow, from early-stage
							startups to established companies looking for a fresh perspective.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-lg text-text leading-relaxed font-medium"
						>
							My mission: to build unique, polished digital products that boost
							user engagement, delight stakeholders, and set a new benchmark
							for quality.
						</motion.p>
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Story;
