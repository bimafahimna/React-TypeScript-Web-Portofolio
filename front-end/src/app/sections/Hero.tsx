import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden"
		>
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-accent-muted/5 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-5xl">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-accent text-subhead mb-4"
				>
					Hi, I'm Bima your go to web developer!
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.35 }}
					className="flex items-center gap-2 mb-6"
				>
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
							<path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.07-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
						</svg>
						Jakarta, Indonesia
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="font-syne text-display"
				>
					Crafting{' '}
					<span className="gradient-text">Modern Web</span>
					<br />
					Experiences.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="mt-8 max-w-xl text-subhead text-text-muted"
				>
					Building performant, beautiful interfaces for startups and teams
					who care about the details and quality of work.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.9 }}
					className="mt-12 flex flex-wrap gap-4"
				>
					<a
						href="#work"
						className="px-8 py-3 font-medium bg-accent text-text-dark rounded-pill hover:bg-accent-warm transition-colors"
					>
						See my work
					</a>
					<a
						href="#connect"
						className="px-8 py-3 font-medium border border-text/20 text-text rounded-pill hover:border-accent hover:text-accent transition-colors"
					>
						Get in touch
					</a>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.2 }}
				className="absolute bottom-12 left-1/2 -translate-x-1/2"
			>
				<div className="w-5 h-8 rounded-pill border-2 border-text/20 flex justify-center pt-1.5">
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-1 h-1 bg-accent rounded-full"
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
