import "./App.css";
import MainLayout from "./components/MainLayout";
import {MainRoutes} from "./routes/main.routes";
import {AuthRoutes} from "./routes/auth.routes";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken]=useState('')
  useEffect(()=>{
    const token = localStorage.getItem("token") || '';
    setToken(token)
  },[])
	
	return (
		<>
			{token ? (
				<MainLayout>
					<MainRoutes />
				</MainLayout>
			) : (
				<MainLayout>
					<AuthRoutes />
				</MainLayout>
			)}
		</>
	);
}

export default App;
