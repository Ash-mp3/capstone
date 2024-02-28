import * as React from 'react';
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";


function Profile() {
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

        <div>
          m
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
export default Profile;

