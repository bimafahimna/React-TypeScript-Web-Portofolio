import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import HomePage from '../../pages/Home';
import App from '../../App';

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
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
