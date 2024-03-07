import * as React from 'react';
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import UserInfo from './userInformation';
import { useEffect, useState } from "react";


function Profile() {
  const [courses, setCourses] = useState('')
  const [authorized, setAuthorized] = useState(true)
  useEffect(() => {
    try{
      fetch("http://localhost:3001/api/profileInfo", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCourses(data.courses)
          setAuthorized(true)
        });
    } catch (err){
      console.log(err)
      setAuthorized(false)
    }

  },[])

  return (
    <div className="Courses">
    {authorized ?
      <div>
        <ResponsiveAppBar>
        </ResponsiveAppBar>

        <UserInfo>
        </UserInfo>
      
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

