import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';

// Drop a transparent PNG in /public and set this to its path.
const aboutImage: string | undefined = undefined;

const highlights = [
	{
		label: 'What I love',
		text: 'The moment a fuzzy idea clicks into working software — a UI that feels right, an API that returns exactly what it should. That small satisfaction, over and over.',
	},
	{
		label: 'What I care about',
		text: "Software that feels considered and human, not just functional. The kind you don't need a tutorial for. Details matter — spacing, motion, the way a button reacts under your finger.",
	},
	{
		label: 'Where I\u2019m headed',
		text: "Keep sharpening the craft, ship products people actually enjoy using, and eventually build things that make life a little easier for the coastal communities I grew up around.",
	},
];

const About = () => {
	return (
		<SectionShell
			id="about"
			tint="mint"
			image={{
				src: aboutImage,
				placement: 'corner',
				corner: 'top-right',
				sizeClassName: 'w-32 md:w-44',
			}}
		>
			<div className="max-w-5xl mx-auto">
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-3 inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest"
				>
					<span className="h-px w-6 bg-accent/60" />
					A little about me
				</motion.p>

				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-syne text-headline mb-6"
				>
					Building software with{' '}
					<span className="bg-gradient-to-r from-accent to-accent-muted bg-clip-text text-transparent">
						purpose
					</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="max-w-2xl text-lg text-text-muted leading-relaxed mb-14"
				>
					I fell into software the way most people fall into hobbies —
					accidentally, and then all at once. Along the way it turned into
					something I care a lot about.
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{highlights.map((item, i) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							whileHover={{ y: -4 }}
							className="group relative p-7 rounded-3xl bg-surface-light/70 backdrop-blur-sm border border-text/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all"
						>
							<span className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-3">
								<span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
								{item.label}
							</span>
							<p className="text-text leading-relaxed">{item.text}</p>
						</motion.div>
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default About;
