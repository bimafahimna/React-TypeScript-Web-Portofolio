import {
	RouterProvider,
	createBrowserRouter,
	redirect,
} from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import HomePage from '../../pages/Home';
import App from '../../App';
import ProjectsPage from '../../pages/Projects';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				loader: async () => redirect('/home'),
			},
			{
				path: 'home',
				element: <HomePage />,
			},
			{
				path: 'projects',
				element: <ProjectsPage />,
			},
		],
	},
	{
		path: '/app',
		element: <App />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
