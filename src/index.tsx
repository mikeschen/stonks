import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Stonk from "./routes/Stonk";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "stonk/:ticker",
		element: <Stonk />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
