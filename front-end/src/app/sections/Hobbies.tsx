import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hobbies } from '../data';
import type { Hobby } from '../data';
import AnimatedSection from '../components/AnimatedSection';

const HobbyCard = ({ hobby, index }: { hobby: Hobby; index: number }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-60px' }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				onClick={() => setIsOpen(true)}
				className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
					hobby.span === 'tall'
						? 'row-span-2'
						: hobby.span === 'wide'
							? 'md:col-span-2'
							: ''
				}`}
			>
				<div
					className={`relative w-full bg-surface-lighter overflow-hidden ${
						hobby.span === 'tall' ? 'h-full min-h-[420px]' : 'aspect-[4/3]'
					}`}
				>
					{hobby.image ? (
						<img
							src={hobby.image}
							alt={hobby.title}
							className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
					) : (
						<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
					)}

					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

					<div className="absolute bottom-0 left-0 right-0 p-6">
						<span className="text-xs text-accent uppercase tracking-widest font-mono">
							{String(index + 1).padStart(2, '0')}
						</span>
						<h3 className="font-syne text-xl md:text-2xl font-bold text-text mt-1 group-hover:text-accent transition-colors duration-300">
							{hobby.title}
						</h3>
						<p className="text-sm text-text-muted mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
							{hobby.description}
						</p>
					</div>
				</div>
			</motion.div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setIsOpen(false)}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-pointer"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-surface-light cursor-default"
						>
							<div className="aspect-video bg-surface-lighter relative overflow-hidden">
								{hobby.image ? (
									<img
										src={hobby.image}
										alt={hobby.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="font-syne text-6xl font-bold text-text/10 select-none">
											{String(index + 1).padStart(2, '0')}
										</span>
									</div>
								)}
							</div>
							<div className="p-8">
								<h3 className="font-syne text-2xl font-bold text-text">
									{hobby.title}
								</h3>
								<p className="mt-2 text-text-muted leading-relaxed">
									{hobby.description}
								</p>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-text transition-colors"
								aria-label="Close"
							>
								&times;
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

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
