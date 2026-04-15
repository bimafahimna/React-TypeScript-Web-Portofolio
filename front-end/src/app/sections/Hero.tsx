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
					className="text-accent text-subhead mb-6"
				>
					Howdy! Meet your developer,
				</motion.p>

				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="font-syne text-display"
				>
					crafting{' '}
					<span className="gradient-text">modern web</span>
					<br />
					experiences.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="mt-8 max-w-xl text-subhead text-text-muted"
				>
					Building performant, beautiful interfaces for startups and teams
					who care about the details.
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
