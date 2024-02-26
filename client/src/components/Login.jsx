import Logo from "../images/Registration_App_Logo.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#474787"),
  backgroundColor: "#474787",
  "&:hover": {
    backgroundColor: "#989898",
  },
}));

function Login() {
const [loggedIn, setLoggedIn] = useState(false)
  //Sign the User in 
  function SignIn(){
    console.log(`signing in`)
    fetch("http://localhost:8000/login")
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn));
  }
  console.log(loggedIn)

  return (
    <div
      id="LoginPage"
      className="w-full h-full relative flex justify-center items-center "
    >
      <header id="LoginHeader" className="w-full h-[75px] flex justify-center absolute top-0">
        <img src={Logo} alt="logo" />
      </header>
      <div id="LoginInfo">
        <h1 className="">Welcome back!</h1>
        <form class="LoginForm">
          <input placeholder="Email Address"></input>
          <input type="password" placeholder="Password"></input>
          <ColorButton className="w-1/2" /* type="submit" */ onClick={SignIn}>
            LogIn
          </ColorButton>
        </form>
        <div class="OrLine">
          <hr />
          OR
          <hr />
        </div>
        <div class="signUp">
          <p>Don't have an accont?</p>
          <Link to={`/SignUp`} className="w-full flex justify-center">
            <ColorButton className="w-5/6">Sign Up</ColorButton>
          </Link>
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
