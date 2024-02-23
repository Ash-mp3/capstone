import Logo from "../images/Registration_App_Logo.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

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
          <h1 className="w-min text-left">
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
              <ColorInput variant="outlined" size="small" label="Username" />
              <ColorInput variant="outlined" size="small" label="First Name" />
              <ColorInput
                variant="outlined"
                size="small"
                label="Phone Number"
              />
              <ColorInput variant="outlined" size="small" label="Password" />
            </div>
            <div className="flex flex-col gap-3">
              <ColorInput variant="outlined" size="small" label="Email" />
              <ColorInput variant="outlined" size="small" label="Last Name" />
              <ColorInput
                variant="outlined"
                size="small"
                label="Home Address"
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Password Agian"
              />
            </div>
          </div>
          <ColorButton className="self-start" type="submit">
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
