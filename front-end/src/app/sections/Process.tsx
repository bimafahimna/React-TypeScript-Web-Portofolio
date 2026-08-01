import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path.
const processImage: string | undefined = undefined;

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
			'From wireframes to high-fidelity mockups, iterating thoughtfully with your feedback baked in.',
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
		<SectionShell
			id="process"
			tint="chartreuse"
			image={{ src: processImage, placement: 'corner', corner: 'top-right', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-5xl mx-auto">
				<div className="mb-14 max-w-2xl">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
					>
						<span className="h-px w-6 bg-accent/60" />
						How I work
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="font-syne text-headline"
					>
						What my perfect{' '}
						<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
							collab
						</span>{' '}
						looks like
					</motion.h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{steps.map((step, i) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							whileHover={{ y: -6 }}
							className="group relative p-8 rounded-3xl bg-surface-light/70 backdrop-blur-sm border border-text/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
						>
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-accent/10 text-accent font-mono text-sm font-semibold group-hover:bg-accent group-hover:text-text-dark transition-colors">
									{step.number}
								</span>
								<span
									aria-hidden
									className="h-1.5 w-1.5 rounded-full bg-accent/40 group-hover:scale-150 group-hover:bg-accent transition-all"
								/>
							</div>
							<h3 className="font-syne text-xl font-bold mb-3 text-text group-hover:text-accent transition-colors">
								{step.title}
							</h3>
							<p className="text-text-muted leading-relaxed">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default Process;
