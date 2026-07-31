import { motion } from 'framer-motion';
import { hobbies } from '../data';
import SectionShell from '../components/SectionShell';
import HobbyCard from '../components/HobbyCard';

// Drop a transparent PNG in /public and set this to its path.
const hobbiesImage: string | undefined = undefined;

const Hobbies = () => {
	return (
		<SectionShell
			id="hobbies"
			tint="teal"
			image={{ src: hobbiesImage, placement: 'corner', corner: 'top-left', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-7xl mx-auto">
				<div className="mb-16 max-w-2xl">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
					>
						<span className="h-px w-6 bg-accent/60" />
						Off the clock
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="font-syne text-headline"
					>
						Beyond the code,{' '}
						<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
							things I enjoy
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-3 text-text-muted text-lg"
					>
						Click any card for the full photo.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
					{hobbies.map((hobby, i) => (
						<HobbyCard key={hobby.title} hobby={hobby} index={i} />
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default Hobbies;
