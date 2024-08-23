import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className=" bg-beige fixed top-0 left-0 ring-0 w-screen h-16 rounded-b-[100px] flex justify-around items-center text-off-white">
			<div>Navbar</div>
			<div>Menu</div>
			<NavLink to={'/home'}>Home</NavLink>
			<NavLink to={'/projects'}>Projects</NavLink>
		</nav>
	);
};

export default Navbar;
