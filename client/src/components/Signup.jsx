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
    zIndex: 2
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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [address, setAddress] = useState('')

  const [city, setCity] = useState('')

  const [country, setCountry] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [errMessages, setErrMessages] = useState({
    emailErr: '',
    phoneNumErr: '',
    passwordErr: '',
    passwordConfirmationErr: '',
  })

  function createAccount(){
    //email must contain word characters, ".", or "_" followed by "@" any combination of letters or digits, followed by a ".", then 3 more letters
    //example: "a@a.aaa"
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = emailRegex.test(email)
    console.log(`isValidEmail: ${isValidEmail}`)

    //phone number must contain 3 digits enclosed in optional parentheses followed by an optional space or hyphen, three more digits, another optional space/hyphen, then four digits
    //example: "(111)1111111", "(123)-123-1234", or "9999999999"
    const phoneNumRegex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
    const isValidPhoneNum = phoneNumRegex.test(phoneNum)
    console.log(`isValidPhoneNum: ${isValidPhoneNum}`)

    //password must contain more than 8 characters; one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const isValidPassword = passwordRegex.test(password)
    console.log(`isValidPassword: ${isValidPassword}`)

    //password must match password confirmation
    const passwordIsVerified = password === passwordConfirmation
    console.log(`passwordIsVerified: ${passwordIsVerified}`)
    
    console.log(``)

    let allInfoIsVerified = true

    //you can comment this next line out so that you don't have to enter valid information when testing
    allInfoIsVerified = isValidEmail && isValidPhoneNum && isValidPassword && passwordIsVerified 
    if(allInfoIsVerified){
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
    } else {
      //if not all info is correctly verified, set error messages accordingly
      let updatedErrMsgs = {
        emailErr: '',
        phoneNumErr: '',
        passwordErr: '',
        passwordConfirmationErr: '',
      }
      if(!isValidEmail){
        updatedErrMsgs.emailErr = 'invalid email'
      }
      if(!isValidPhoneNum){
        updatedErrMsgs.phoneNumErr = 'Invalid phone number'
      }
      if(!isValidPassword){
        updatedErrMsgs.passwordErr = 'Password be at least 8 characters long with at least one uppercase letter, one lowercase letter, one special character, and one number'
      }
      if(!passwordIsVerified){
        updatedErrMsgs.passwordConfirmationErr = 'Password confirmation does not match password'
      }
      setErrMessages(updatedErrMsgs)
    }
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
              <span className="underline">Log In</span>
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
                label="Phone"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
              <ColorInput
              variant="outlined"
              size="small"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Password"
                type="password"
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
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Confirm Password"    
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <div>{errMessages.passwordConfirmationErr}</div>
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


