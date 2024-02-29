import Logo from "../assets/Registration_App_Logo.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#474787"),
  backgroundColor: "#474787",
  "&:hover": {
    backgroundColor: "#989898",
  },
}));

const ColorInput = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#474787",
  },
  "& label": {
    color: "#666",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#474787",
      backgroundColor: "#fff",
      color: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#474787",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#474787",
      backgroundColor: "#fff",
    },
  },
}));

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [phoneNum, setPhoneNum] = useState('')
  const [phoneNumErr, setPhoneNumErr] = useState(null)

  const [address, setAddress] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(null)

  function createAccount(){
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = emailRegex.test(email)

    const phoneNumRegex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
    const isValidPhoneNum = emailRegex.test(email)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const isValidPassword = passwordRegex.test(password)

    const passwordIsVerified = password === passwordConfirmation
    /* 
    fetch("http://localhost:3001/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
        phoneNum,
        address,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg)
      });
    console.log(username)
    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(phoneNum)
    console.log(address)
    console.log(password)
    console.log(passwordConfirmation) */
  }


  return (
    <div
      id="SignupPage"
      className="w-full h-full relative flex justify-center items-center "
    >
      <header
        id="SignupHeader"
        className="w-full h-[75px] flex justify-center absolute top-0"
      >
        <img src={Logo} alt="logo" />
      </header>

      <div id="SignupInfo">
        <div className="flex flex-col text-center items-center w-1/2 gap-4">
          <h1 className="w-min text-left text-[60px]">
            Create
            <br />
            Your
            <br />
            Account!
          </h1>
          <p>
            Already have an account?{" "}
            <Link to={"/Login"}>
              <span className="underline">LogIn</span>
            </Link>
          </p>
        </div>
        <div className=" w-[4px] h-5/6 bg-black">.</div>
        <form className="flex flex-col w-1/2 gap-10 relative">
          <div className="flex gap-5 mt-6 ">
            <div className="flex flex-col gap-3">
              <ColorInput
                variant="outlined"
                size="small"
                label="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Phone Number"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <ColorInput
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Home Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Password Agian"    
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>
          <ColorButton className="self-start" onClick={createAccount}>
            Sign up
          </ColorButton>
        </form>
      </div>

      <footer
        id="SignupFooter"
        className="w-full h-[25px] flex justify-center items-center absolute bottom-0"
      >
        <p>Privacy Policy</p>
        <p>@2023 - MtecPro</p>
        <p>Terms Of Use</p>
      </footer>
    </div>
  );
}

export default Signup;
