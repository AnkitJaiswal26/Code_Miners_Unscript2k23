import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import BRegister from "./Screens/Buyer/Register/BRegister";
import SRegister from "./Screens/Seller/Register/SRegister";
import MRegister from "./Screens/Manufacturer/Register/MRegister";
import Products from "./Screens/Manufacturer/Products/Products";
import AddProduct from "./Screens/Manufacturer/AddProducts/AddProduct";
import Footer from "./Components/Footer/Footer";
import { RouterProvider } from "react-router";
import Home from "./Screens/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Admin from "./Screens/Admin/Admin";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<>
					<Home />
				</>
			),
		},
		{
			path: "/register",
			element: (
				<>
					<Navbar />
					<BRegister />
				</>
			),
		},
		{
			path: "/registerCompany",
			element: (
				<>
					<Navbar />
					<MRegister />
				</>
			),
		},
		{
			path: "/registerSeller",
			element: (
				<>
					<Navbar />
					<SRegister />
				</>
			),
		},
		{
			path: "/admin",
			element: (
				<>
					<Navbar />
					<Admin />
				</>
			),
		},
	]);

	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
