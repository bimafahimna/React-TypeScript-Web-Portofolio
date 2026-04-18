import { motion } from 'framer-motion';
import { formalEducation, informalEducation } from '../data';
import AnimatedSection from '../components/AnimatedSection';

const Academic = () => {
	return (
		<AnimatedSection id="academic" className="section-padding bg-surface-light">
			<div className="max-w-4xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-4"
				>
					Academic background
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-text-muted text-lg mb-16"
				>
					where it all started
				</motion.p>

				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="font-syne text-2xl font-bold text-text mb-6"
				>
					Formal
				</motion.h3>
				<div className="space-y-0 mb-16">
					{formalEducation.map((item, i) => (
						<motion.div
							key={item.institution}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-accent/20 transition-colors"
						>
							<div>
								<h4 className="font-syne text-xl font-bold text-text group-hover:text-accent transition-colors">
									{item.institution}
								</h4>
								<p className="text-sm text-text-muted mt-1">
									{item.degree} — {item.field}
								</p>
								{item.gpa && (
									<p className="text-xs text-text-muted mt-0.5">
										GPA: {item.gpa}
									</p>
								)}
							</div>
							<span className="text-sm text-text-muted font-mono">
								{item.period}
							</span>
						</motion.div>
					))}
				</div>

				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="font-syne text-2xl font-bold text-text mb-6"
				>
					Informal
				</motion.h3>
				<div className="space-y-0">
					{informalEducation.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-accent/20 transition-colors"
						>
							<div>
								<h4 className="font-syne text-xl font-bold text-text group-hover:text-accent transition-colors">
									{item.title}
								</h4>
								<p className="text-sm text-text-muted mt-1">
									{item.provider}
								</p>
								{item.credential && (
									<p className="text-xs text-text-muted mt-0.5">
										{item.credential}
									</p>
								)}
							</div>
							<span className="text-sm text-text-muted font-mono">
								{item.period}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Academic;
