import { motion } from 'framer-motion';
import { socialLinks } from '../data';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path.
const connectImage: string | undefined = undefined;

const Connect = () => {
	const email = `b.fahimna@gmail.com`;
	return (
		<SectionShell
			id="connect"
			tint="paper"
			image={{ src: connectImage, placement: 'corner', corner: 'top-right', sizeClassName: 'w-32 md:w-44' }}
		>
			<div className="max-w-4xl mx-auto text-center">
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
				>
					<span className="h-px w-6 bg-accent/60" />
					Say hi
				</motion.p>

				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-4"
				>
					Let's build something{' '}
					<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
						good
					</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-text-muted text-lg mb-10"
				>
					Tap the button, drop me a line, I read everything.
				</motion.p>

				<motion.a
					href={`mailto:${email}`}
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.15 }}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					className="inline-block px-14 py-5 text-xl font-syne font-bold bg-accent text-text-dark 
					rounded-pill shadow-lg shadow-accent/25 hover:bg-accent-warm hover:shadow-xl hover:shadow-accent/40 transition-colors"
				>
					Connect
				</motion.a>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6"
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
					className="mt-14 flex flex-wrap justify-center gap-3"
				>
					{socialLinks.map((link) => (
						<a
							key={link.label}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-surface border border-text/10 hover:border-accent/30 hover:-translate-y-0.5 transition-all"
						>
							<span className="text-[10px] text-text-muted uppercase tracking-widest">
								{link.category}
							</span>
							<span className="text-text group-hover:text-accent transition-colors font-medium">
								{link.label}
							</span>
						</a>
					))}
				</motion.div>
			</div>

			<footer className="max-w-5xl mx-auto mt-24 pt-10 border-t border-text/10">
				<div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-start text-sm text-text-muted">
					<div>
						<a
							href="#hero"
							className="inline-block font-syne font-bold text-2xl text-text hover:text-accent transition-colors"
						>
							Bima.
						</a>
						<p className="mt-2 max-w-xs leading-relaxed">
							Web developer from Jakarta, crafting interfaces one thoughtful
							detail at a time.
						</p>
					</div>

					<nav className="md:justify-self-center">
						<p className="text-[10px] uppercase tracking-widest text-text-muted/70 mb-3">
							Explore
						</p>
						<ul className="grid grid-cols-2 gap-x-8 gap-y-2">
							<li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
							<li><a href="#work" className="hover:text-accent transition-colors">Work</a></li>
							<li><a href="#story" className="hover:text-accent transition-colors">Story</a></li>
							<li><a href="#academic" className="hover:text-accent transition-colors">Academic</a></li>
							<li><a href="#hobbies" className="hover:text-accent transition-colors">Hobbies</a></li>
							<li><a href="#process" className="hover:text-accent transition-colors">Process</a></li>
						</ul>
					</nav>

					<div className="md:text-right">
						<p className="text-[10px] uppercase tracking-widest text-text-muted/70 mb-3">
							Say hi
						</p>
						<a
							href={`mailto:${email}`}
							className="block text-text hover:text-accent transition-colors font-medium"
						>
							{email}
						</a>
						<div className="mt-3 flex md:justify-end gap-4">
							{socialLinks.map((link) => (
								<a
									key={link.label}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-accent transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>
					</div>
				</div>

				<div className="mt-10 pt-6 border-t border-text/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-text-muted/80">
					<p>&copy; {new Date().getFullYear()} Bima. All rights reserved.</p>
					<p>
						Made with care in{' '}
						<span className="text-accent">Jakarta</span>.
					</p>
				</div>
			</footer>
		</SectionShell>
	);
};

export default Connect;
