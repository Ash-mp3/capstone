import * as React from 'react';
import AccordionCom from './AccordionCom';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

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
      <ResponsiveAppBar>
      </ResponsiveAppBar>
      
      <div id="listOfAvailable">
        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>
      </div>

      <Footer>
      </Footer>

    </div>
    :
    <div>unauthorized</div>
    }
    </div>

  );
}
export default Courses;

