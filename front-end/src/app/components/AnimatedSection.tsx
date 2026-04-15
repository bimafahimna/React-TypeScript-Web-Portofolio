import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
	children: ReactNode;
	className?: string;
	id?: string;
}

const AnimatedSection = ({ children, className = '', id }: AnimatedSectionProps) => {
	return (
		<motion.section
			id={id}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.6 }}
			className={className}
		>
			{children}
		</motion.section>
	);
};

export default AnimatedSection;
