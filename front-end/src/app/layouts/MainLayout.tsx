import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ImagePreloader from '../components/ImagePreloader';
import PageLoader from '../components/PageLoader';
import useImageReady from '../hooks/useImageReady';
import { sectionAssets } from '../data';
import { HERO_PHOTO_SRC } from '../data/hero';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Work from '../sections/Work';
import Experience from '../sections/Experience';
import Story from '../sections/Story';
import Process from '../sections/Process';
import Academic from '../sections/Academic';
import Hobbies from '../sections/Hobbies';
import Connect from '../sections/Connect';

const MainLayout = () => {
	// Gate the first render on the hero photo being fully decoded so the Hero
	// section and the photo appear in the same frame (no pop-in).
	const heroPhotoReady = useImageReady(HERO_PHOTO_SRC);

	return (
		<div className="relative">
			<AnimatePresence>
				{!heroPhotoReady && (
					<motion.div
						key="page-loader"
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.35, ease: 'easeOut' }}
					>
						<PageLoader />
					</motion.div>
				)}
			</AnimatePresence>

			{heroPhotoReady && (
				<>
					<Navbar />
					<ImagePreloader sections={sectionAssets} radius={2} />
					<main>
						<Hero />
						<About />
						<Work />
						<Experience />
						<Academic />
						<Story />
						<Hobbies />
						<Process />
						<Connect />
					</main>
				</>
			)}
		</div>
	);
};

export default MainLayout;
