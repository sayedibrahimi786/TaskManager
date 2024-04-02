import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [userInfo, setUserInfo] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = "http://localhost:3000/api/v1/login";
			const url = "http://cs.wheatoncollege.edu:3000/api/v1/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            const res = await response.json();
            if (response.ok) {
                localStorage.setItem("token", res.data);
                window.location = "/";
            } else {
                throw new Error(res.message || "Failed to authenticate");
            }
        } catch (error) {
            setError("An error occurred while authenticating");
        }
    };

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={userInfo.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={userInfo.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
