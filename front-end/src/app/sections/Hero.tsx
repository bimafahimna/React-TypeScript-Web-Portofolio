import { motion, useReducedMotion } from 'framer-motion';
import PhotoFrame from '../components/PhotoFrame';
import WordCarousel from '../components/WordCarousel';

// ---------------------------------------------------------------------------
// Drop your photo in /public (e.g. /public/me.jpg) and set `photoSrc` below.
// Leave it `undefined` to keep the "BF" initials placeholder.
// Switch `frameShape` to 'circle' for a classic avatar look.
// ---------------------------------------------------------------------------
const photoSrc: string | undefined = '/hero/self_foto.png';
const frameShape: 'circle' | 'rectangle' = 'rectangle';

// Words that describe you. Rotate through in the hero. Edit freely.
const descriptorWords = [
	'developer',
	'engineer',
	'builder',
	'problem solver',
	'design nerd',
	'coffee enthusiast',
	'ocean lover',
];

const Hero = () => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden bg-surface-light"
		>
			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					animate={
						prefersReducedMotion
							? undefined
							: { scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }
					}
					transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] bg-accent/15 rounded-full blur-3xl"
				/>
				<motion.div
					animate={
						prefersReducedMotion
							? undefined
							: { scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 20, 0] }
					}
					transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
					className="absolute bottom-1/4 -left-32 w-[24rem] h-[24rem] bg-accent-muted/15 rounded-full blur-3xl"
				/>
				<div
					className="absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage:
							'radial-gradient(circle, currentColor 1px, transparent 1px)',
						backgroundSize: '24px 24px',
					}}
				/>
			</div>

			<div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-[1.4fr_auto] gap-12 lg:gap-16 items-center">
				<div>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-4"
					>
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
							</span>
							Available for work
						</span>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-accent text-subhead mb-2"
					>
						Hi, I'm Bima{' '}
						<span role="img" aria-label="waving hand">
							👋
						</span>
					</motion.p>

					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.28 }}
						className="mb-5 text-text-muted text-lg md:text-xl"
					>
						I'm{' '}
						<WordCarousel
							words={descriptorWords}
							interval={2400}
							className="font-syne font-semibold bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent"
						/>
					</motion.p>

					{/*
					  Short who-am-I. Edit to sound like you, keep it to a
					  sentence or two so the hero stays simple.
					*/}
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="max-w-xl text-2xl md:text-3xl font-syne font-semibold text-text leading-snug"
					>
						A web developer from Jakarta who loves turning fuzzy ideas into
						snappy, delightful interfaces.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.45 }}
						className="mt-6 flex items-center gap-2 text-sm text-text-muted"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent">
							<path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.07-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
						</svg>
						Based in Jakarta, Indonesia
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="mt-10 flex flex-wrap gap-4"
					>
						<a
							href="#work"
							className="px-7 py-3 font-medium bg-accent text-text-dark rounded-pill shadow-lg shadow-accent/20 hover:bg-accent-warm hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 transition-all"
						>
							See my work
						</a>
						<a
							href="#connect"
							className="px-7 py-3 font-medium border border-text/20 text-text rounded-pill hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all"
						>
							Get in touch
						</a>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
					className="justify-self-center lg:justify-self-end w-56 md:w-64 lg:w-72"
				>
					<motion.div
						animate={
							prefersReducedMotion
								? undefined
								: { y: [0, -8, 0] }
						}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
					>
						<PhotoFrame
							src={photoSrc}
							initials="BF"
							shape={frameShape}
							alt="Bima, web developer in Jakarta"
						/>
					</motion.div>
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
