import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data';

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<motion.nav
				initial={{ y: -80 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-pill transition-all duration-300 ${
					scrolled
						? 'bg-surface-light/90 backdrop-blur-xl shadow-lg shadow-black/20'
						: 'bg-surface-light/60 backdrop-blur-md'
				}`}
			>
				<a
					href="#hero"
					className="font-syne font-bold text-lg text-text px-3 hover:text-accent transition-colors"
				>
					B.
				</a>

				<div className="hidden md:flex items-center gap-1">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors rounded-pill hover:bg-white/5"
						>
							{link.label}
						</a>
					))}
				</div>

				<a
					href="#connect"
					className="hidden md:block px-5 py-2 text-sm font-medium bg-accent text-text-dark rounded-pill hover:bg-accent-warm transition-colors"
				>
					Start project
				</a>

				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="md:hidden px-3 py-2 text-sm text-text-muted hover:text-text transition-colors"
					aria-label="Toggle menu"
				>
					{menuOpen ? 'Close' : 'Menu'}
				</button>
			</motion.nav>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className="text-3xl font-syne font-bold text-text hover:text-accent transition-colors"
							>
								{link.label}
							</a>
						))}
						<a
							href="#connect"
							onClick={() => setMenuOpen(false)}
							className="mt-4 px-8 py-3 text-lg font-medium bg-accent text-text-dark rounded-pill hover:bg-accent-warm transition-colors"
						>
							Start project
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
