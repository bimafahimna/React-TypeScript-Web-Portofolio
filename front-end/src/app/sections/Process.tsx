import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const steps = [
	{
		number: '01',
		title: 'Discovery',
		description:
			'We start with understanding your goals, audience, and vision. Deep research drives every decision.',
	},
	{
		number: '02',
		title: 'Design & Prototype',
		description:
			'From wireframes to high-fidelity mockups, I iterate thoughtfully with your feedback baked in.',
	},
	{
		number: '03',
		title: 'Develop',
		description:
			'Clean, performant code using modern tools. Every detail from design is carefully translated.',
	},
	{
		number: '04',
		title: 'Launch & Refine',
		description:
			'Ship with confidence, then iterate based on real feedback and analytics.',
	},
];

const Process = () => {
	return (
		<AnimatedSection id="process" className="section-padding bg-surface-light">
			<div className="max-w-5xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-16"
				>
					What my perfect collab looks like
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{steps.map((step, i) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="group p-8 rounded-2xl bg-surface hover:bg-surface-lighter border border-white/5 hover:border-accent/20 transition-all duration-300"
						>
							<span className="font-mono text-sm text-accent">{step.number}</span>
							<h3 className="font-syne text-xl font-bold mt-3 mb-3 text-text group-hover:text-accent transition-colors">
								{step.title}
							</h3>
							<p className="text-text-muted leading-relaxed">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Process;
