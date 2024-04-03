// import styles from "./styles.module.css";
import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

// const handleLogout = () => {
// 	localStorage.removeItem("token");
// 	window.location.reload();
// };

const RedirectToServerHome = () => {
	useEffect(() => {
		const redirectToServerHome = async () => {
		const user = localStorage.getItem("token");
		try {
			if (user) {
			//await fetch("http://localhost:3000");
			// window.location.href = "http://localhost:3000";
			window.location.href = apiUrl;
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
  
		redirectToServerHome();
	}, []);
  
	// Render nothing since this component will only perform side effects
	return null;
  }

  
  
	// return (
	// 	<div className={styles.main_container}>
	// 		<nav className={styles.navbar}>
	// 			<h1>fakebook</h1>
	// 			<button className={styles.white_btn} onClick={handleLogout}>
	// 				Logout
	// 			</button>
	// 		</nav>
	// 	</div>
	// );

export default RedirectToServerHome;