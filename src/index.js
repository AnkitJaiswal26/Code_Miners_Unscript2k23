import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { SupplyChainProvider } from "./Context/SupplyChainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<SupplyChainProvider>
				<App />
			</SupplyChainProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
