import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import UserInfo from './userInformation';

import handleStatus from '../controllers/handleStatus';
import AuthDisplay from './AuthDisplay'

function Profile() {
  const [info, setInfo] = useState({
    courses: [],
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    city: '',
    country: '',
  });
  const [authorizeStatus, setAuthorizeStatus] = useState("loading...")

  useEffect(() => {
    try {
      fetch("http://localhost:3001/api/profileInfo", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
        .then((res) => {
          setAuthorizeStatus(handleStatus(res))
          if(res.ok){
            return(res.json())
          }
        })
        .then((data) => {
          setInfo(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  
  return (
    <div className="Courses">
      {authorizeStatus === 'authorized' ?
        <div>
          <ResponsiveAppBar />
          <UserInfo courses={info.courses} username={info.username} email={info.email} firstName={info.first_name} lastName={info.last_name} phoneNum={info.phone_number} address={info.address} city={info.city} country={info.country} />
          <Footer />
        </div>
        :
        <AuthDisplay authorizestatus={authorizeStatus} />
      }
    </div>
  );
}

export default Profile;