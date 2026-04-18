import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
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
			<main>
				<Hero />
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
