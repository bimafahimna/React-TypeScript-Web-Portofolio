import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path.
const storyImage: string | undefined = undefined;

const Story = () => {
	return (
		<SectionShell
			id="story"
			tint="cream"
			image={{ src: storyImage, placement: 'corner', corner: 'bottom-left', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-5xl mx-auto">
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
				>
					<span className="h-px w-6 bg-accent/60" />
					My story
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-14"
				>
					From oceanography{' '}
					<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
						to software engineering
					</span>
				</motion.h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					<div className="space-y-6">
						<motion.p
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							I studied Oceanography at Bandung Institute of Technology,
							immersed in a world of data, systems, and patterns in nature.
							It taught me to think analytically, ask the right questions,
							and see the bigger picture behind complex problems.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							But alongside my studies, I was always drawn to programming.
							What started as self-taught curiosity, building small tools for
							my daily use, gradually grew into something I couldn&apos;t
							ignore: a genuine passion for software engineering.
						</motion.p>
					</div>

					<div className="space-y-6">
						<motion.p
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="text-lg text-text-muted leading-relaxed"
						>
							After graduating, I went all-in on the transition, taking
							structured courses, working on real-world projects, and gaining
							hands-on experience through internships, including at Shopee. My
							science background shaped the way I think: I approach engineering
							challenges with the same methodical, analytical mindset I once
							applied to ocean data.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-lg text-text leading-relaxed font-medium"
						>
							Today, I&apos;m an Engineer at Tiket, writing production code for
							millions of users across Indonesia, and still learning and
							growing every day.
						</motion.p>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					whileHover={{ y: -4 }}
					className="mt-16 p-8 rounded-3xl border border-accent/20 bg-surface-light/70 backdrop-blur-sm shadow-lg shadow-accent/5 relative overflow-hidden"
				>
					<div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent via-accent-muted to-accent-warm rounded-l-3xl" />
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.3 }}
						className="text-accent text-sm font-semibold uppercase tracking-widest mb-3"
					>
						Beyond code
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-xl text-text leading-relaxed font-medium"
					>
						I'm passionate about using technology to strengthen Indonesia's
						coastal communities. By combining my oceanography background with
						software engineering and data, I build digital solutions that
						empower fisheries, support local businesses, and contribute to a
						more sustainable coastal economy.
					</motion.p>
				</motion.div>
			</div>
		</SectionShell>
	);
};

export default Story;
