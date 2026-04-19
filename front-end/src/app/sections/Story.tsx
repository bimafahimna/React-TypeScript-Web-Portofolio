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
					{'From Oceanography'}
					<br />
					<span className="gradient-text">To Software Engineering</span>
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
							I studied Oceanography at the Bandung Institute of Technology,
							immersed in a world of data, systems, and patterns in nature.
							It taught me to think analytically, ask the right questions,
							and see the bigger picture behind complex problems.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							But alongside my studies, I was always drawn to building things
							on the web. What started as self-taught curiosity gradually
							grew into something I couldn&apos;t ignore: a genuine passion
							for software engineering.
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
							After graduating, I fully committed to the transition by taking
							structured courses, building projects, and landing internships
							at companies like Shopee. The analytical foundations from
							science gave me an edge: I approach engineering problems the
							same way I approached ocean data, methodically and curiously.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-lg text-text leading-relaxed font-medium"
						>
							Today, I&apos;m a Backend Engineer at Tiket.com, writing
							production code that serves millions of users across Indonesia,
							and still as curious as ever about what I can build next.
						</motion.p>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-20 p-8 rounded-2xl border border-accent/20 bg-accent/5 relative overflow-hidden"
				>
					<div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-muted rounded-l-2xl" />
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.3 }}
						className="text-accent text-sm font-semibold uppercase tracking-widest mb-3"
					>
						Next Milestone
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-xl text-text leading-relaxed font-medium"
					>
						Where both worlds converge. My goal is to help digitalize the
						social and economic infrastructure of small businesses in
						coastal communities across Indonesia. As both an oceanographer
						and a software engineer, I see a unique opportunity to build
						the digital tools these communities need, from fisheries
						management to local commerce platforms, and bring them into
						the modern economy.
					</motion.p>
				</motion.div>
			</div>
		</AnimatedSection>
	);
};

export default Story;
