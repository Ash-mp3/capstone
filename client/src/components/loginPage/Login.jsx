import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../ResponsiveAppBar";

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText("#474787"),
	backgroundColor: "#474787",
	"&:hover": {
		backgroundColor: "#989898",
	},
}));

function Login() {
	const [token, setToken] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [user_role, setUser_role] = useState();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	//Sign the User in
	function SignIn(email, password) {
		fetch(`/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.loggedIn) {
					setLoggedIn(data.loggedIn);
					setUser_role(data.user_role);
					localStorage.setItem("token", data.token);
					localStorage.setItem("user_role", data.user_role);
				} else {
					alert(data.msg);
				}
			});
	}
	//redirect to courses page when logged in
	if (loggedIn) {
		window.location.href = "/courses";
	}

	return (
		<div id="LoginPage" className="w-full h-full relative flex justify-center items-center">
			<header id="LoginHeader" className="w-full flex justify-center absolute top-0">
				<ResponsiveAppBar user_role={user_role} />
			</header>
			<div id="LoginInfo">
				<h1 className="text-[60px] text-center">Welcome back!</h1>
				<form className="LoginForm">
					<input placeholder="Email Address" onChange={handleEmailChange} autoComplete="username" value={email} />
					<input placeholder="Password" onChange={handlePasswordChange} autoComplete="current-password" value={password} type="password" />
					<ColorButton className="w-1/2" onClick={() => SignIn(email, password)}>
						Log In
					</ColorButton>
				</form>
				<div className="OrLine">
					<hr />
					OR
					<hr />
				</div>
				<div className="signUp">
					<p>Don't have an account?</p>
					<Link to={`/SignUp`} className="w-full flex justify-center">
						<ColorButton className="w-5/6">Sign Up</ColorButton>
					</Link>
				</div>


				<div className="flex">
					<div className="sample-user flex justify-center">
						<ColorButton onClick={() => SignIn("user2@mail", "2")}>
							Log In as sample user
						</ColorButton>
					</div>
					<div className="sample-user flex justify-center">
						<ColorButton onClick={() => SignIn("user1@mail", "1")}>
							Log in as sample admin
						</ColorButton>
					</div>
				</div>


			</div>


			<footer id="loginFooter" className="w-full h-[25px] flex justify-center items-center absolute bottom-0">
				<p>Help</p>
				<p>@2023 - MtecPro</p>
				<p>About</p>
			</footer>
		</div>
	);
}

export default Login;
