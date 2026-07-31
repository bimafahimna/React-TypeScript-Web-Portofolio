import { motion } from 'framer-motion';
import { experiences } from '../data';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path.
const experienceImage: string | undefined = undefined;

const Experience = () => {
	return (
		<SectionShell
			id="experience"
			tint="paper"
			image={{ src: experienceImage, placement: 'corner', corner: 'bottom-right', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-4xl mx-auto">
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
				>
					<span className="h-px w-6 bg-accent/60" />
					Experience
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-4"
				>
					Every experience teaches{' '}
					<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
						something
					</span>
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-text-muted text-lg mb-14"
				>
					A quick tour of places I've called home.
				</motion.p>

				<div className="rounded-3xl border border-text/10 bg-surface-light/60 backdrop-blur-sm p-4 md:p-6">
					{experiences.map((exp, i) => (
						<motion.div
							key={exp.company}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.08 }}
							whileHover={{ x: 4 }}
							className={`group flex items-center justify-between gap-4 rounded-2xl px-4 py-5 hover:bg-accent/5 transition-colors ${
								i !== experiences.length - 1 ? 'border-b border-text/5' : ''
							}`}
						>
							<div className="flex items-start gap-4 min-w-0">
								<span
									aria-hidden
									className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0 group-hover:scale-150 transition-transform"
								/>
								<div className="min-w-0">
									<h3 className="font-syne text-xl font-bold text-text group-hover:text-accent transition-colors truncate">
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
							</div>
							<span className="text-sm text-text-muted font-mono shrink-0">
								{exp.period}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default Experience;
