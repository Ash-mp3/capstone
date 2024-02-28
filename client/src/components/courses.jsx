import * as React from 'react';
import AccordionCom from './AccordionCom';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

//This is for user course page
import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState('')
  const [authorizeStatus, setAuthorizeStatus] = useState("authorizing")

  //fetch courses
  useEffect(() => {
    fetch("http://localhost:3001/api/courses", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    .then((res) => {
      //if the status is OK, set the authorizeStatus to authorized.
      //Otherwise, set the authorizeStatus to unauthorized
      if(res.status === 200){
        setAuthorizeStatus('authorized')
        return(res.json())
      } else {
        setAuthorizeStatus('unauthorized')
        return
      }
    })
    .then((data) => {
      setCourses(data.courses)
    });
  },[])

  return (
    <div className="Courses">
    {
    authorizeStatus === 'authorized' ?
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
    <div>{authorizeStatus}</div>
    }
    </div>

  );
}
export default Courses;

