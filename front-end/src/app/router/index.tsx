import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
