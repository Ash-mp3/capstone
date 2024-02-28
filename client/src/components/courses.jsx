import Logo from "../assets/Registration_App_Logo.png"
import Button from "@mui/material/Button"
import '../css/courses.css'; 
//import { ReactRoutes } from "./components/ReactRoutes";
//This is for user course page
import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState('')
  const [authorized, setAuthorized] = useState(false)
  useEffect(() => {
    try{
      fetch("http://localhost:3001/api/courses", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCourses(data.courses)
          setAuthorized(true)
        });
    } catch (err){
      setAuthorized(false)
    }

  },[])

  return (
    <div className="Courses">
      {authorized ?
      <div>
      <h1 id="userWelcome">Welcome User!</h1>
        <footer id="typicalFooter" className="w-full h-[25px] flex justify-center items-center absolute bottom-0">
            <p>Help</p>
            <p>@2023 - MtecPro</p>
            <p>About</p>
        </footer>
      </div>
      :
      <div>unauthorized</div>
      }
    </div>

  );
}

export default Courses;
