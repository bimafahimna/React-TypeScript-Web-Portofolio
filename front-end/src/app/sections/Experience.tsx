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
								{exp.location && (
									<p className="flex items-center gap-1 text-xs text-text-muted/70 mt-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-3 h-3 shrink-0"
										>
											<path
												fillRule="evenodd"
												d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.07-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
												clipRule="evenodd"
											/>
										</svg>
										{exp.location}
									</p>
								)}
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
