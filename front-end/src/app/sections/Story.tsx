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
							I studied Oceanography at Bandung Institute of Technology,
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
							But alongside my studies, I was always drawn to programming and computer.
							What started as self-taught curiosity making a software for my daily use, gradually
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
							After graduating, I committed fully to the transition into software engineering by
							taking structured courses, building real-world projects, and gaining hands-on experience
							through internships, including at Shopee. My background in science shaped the way I think:
							I approach engineering challenges with the same methodical, analytical mindset I
							once applied to ocean data.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-lg text-text leading-relaxed font-medium"
						>
							Today, I&apos;m an Engineer at Tiket, writing
							production code for millions of users across Indonesia,
							and still learning and growing as a software engineer and a person.
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
						Beyond Code
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-xl text-text leading-relaxed font-medium"
					>
						I'm passionate about using technology to strengthen Indonesia's coastal communities. By combining my background in oceanography with software engineering and data, I build digital solutions that empower fisheries, support local businesses, and contribute to a more sustainable coastal economy.
					</motion.p>
				</motion.div>
			</div>
		</AnimatedSection>
	);
};

export default Story;
