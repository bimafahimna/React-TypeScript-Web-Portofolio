import { motion } from 'framer-motion';
import { socialLinks } from '../data';
import AnimatedSection from '../components/AnimatedSection';

const Connect = () => {
	const email = `b.fahimna@gmail.com`
	return (
		<AnimatedSection id="connect" className="section-padding">
			<div className="max-w-4xl mx-auto text-center">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-text-muted text-lg mb-6"
				>
					Tap this &apos;tiny&apos; button to start your next project
				</motion.p>

				<motion.a
					href={`mailto:${email}`}
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="inline-block px-16 py-6 text-2xl font-syne font-bold bg-accent text-text-dark rounded-pill hover:bg-accent-warm transition-colors"
				>
					Connect
				</motion.a>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-8"
				>
					<a
						href={`mailto:${email}`}
						className="text-text-muted hover:text-accent transition-colors underline underline-offset-4"
					>
						{email}
					</a>
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-16 flex flex-wrap justify-center gap-6"
				>
					{socialLinks.map((link) => (
						<a
							key={link.label}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex flex-col items-center gap-1"
						>
							<span className="text-xs text-text-muted uppercase tracking-wider">
								{link.category}
							</span>
							<span className="text-text group-hover:text-accent transition-colors font-medium">
								{link.label}
							</span>
						</a>
					))}
				</motion.div>
			</div>

			<div className="max-w-4xl mx-auto mt-24 pt-8 border-t border-white/5">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
					<p>&copy; {new Date().getFullYear()} Bima. All rights reserved.</p>
					<div className="flex gap-6">
						<a href="#work" className="hover:text-text transition-colors">Work</a>
						<a href="#story" className="hover:text-text transition-colors">Story</a>
						<a href="#process" className="hover:text-text transition-colors">Process</a>
						<a href="#connect" className="hover:text-text transition-colors">Connect</a>
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Connect;
