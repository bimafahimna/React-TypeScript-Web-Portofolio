import Navbar from '../components/Navbar';
import ImagePreloader from '../components/ImagePreloader';
import { sectionAssets } from '../data';
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
	return (
		<div className="relative">
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
		</div>
	);
};

export default MainLayout;
