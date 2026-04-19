import { motion } from 'framer-motion';
import { hobbies } from '../data';
import AnimatedSection from '../components/AnimatedSection';
import HobbyCard from '../components/HobbyCard';

const Hobbies = () => {
	return (
		<AnimatedSection id="hobbies" className="section-padding">
			<div className="max-w-7xl mx-auto">
				<div className="mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="font-syne text-headline"
					>
						Beyond the code,
						<br />
						<span className="gradient-text">things I enjoy</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-3 text-text-muted text-lg"
					>
						click to see the full photo
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
					{hobbies.map((hobby, i) => (
						<HobbyCard key={hobby.title} hobby={hobby} index={i} />
					))}
				</div>
			</div>
		</AnimatedSection>
	);
};

export default Hobbies;
