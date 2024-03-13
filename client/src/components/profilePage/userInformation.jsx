import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TimeTable from './timetable.jsx';
import TuitionComp from './tuitionComponent.jsx';
import CreditComp from './creditHours.jsx';
import Avatar from '@mui/material/Avatar';

const apiUrl = import.meta.env.VITE_SOME_KEY; 

let password = '*****';

export default function SearchAppBar(props) {
    const { courses, username, email, firstName, lastName, phoneNum, address, city, country } = props;
    const [userInfo, setUserInfo] = useState()
    const [isEditable, setIsEditable] = useState();
    
    useEffect(() => {
        setUserInfo({ username: username, email: email, first_name: firstName, last_name: lastName, phone_number: phoneNum, address: address, city: city, country: country })
    }, [props])
    
    const handleInputChange = (event) => {
        setUserInfo({...userInfo, [event.currentTarget.id]: event.target.value })
    };
    
    const updateUserInfo = async () => {
      if (isEditable) {
        console.log(userInfo)
        try {
          fetch(`/api/updateUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
              body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        } catch (err) {
          console.log(err);
        }
      } 
    };

  return (
    <div id='userPage' className = 'grid grid-cols-1'>
        <div id='userWelcome'>
              <h1 className='p-2'>
                 
                Welcome {firstName}!
            </h1>
            <p className = 'p-2'>
                This is your profile page. Shows overall user details.
            </p>
        </div>

        <div id='userPicture' className='place-self-center m-4'>
        <Avatar className='rounded-full border-2 border-black border-solid w-80' sx={{ borderRadius: '100%', border: '2px', borderColor: 'black', borderStyle: 'solid', width: '320px', height: '320px', fontSize: '200px',  }}>{username.charAt(0).toUpperCase()}</Avatar>
        </div>

        <div id='userInfoBanner' className = 'display flex place-content-center m-2'>
                <h2 className='py-2 mx-2'>My Account</h2>
              <Button variant='outlined' onClick={() => { setIsEditable(!isEditable); updateUserInfo()}} style={{width: 200}}>{!isEditable ? 'Edit' : 'Save'}</Button>
        </div>

        <div id='userInfo&Contact' className='flex w-full justify-center'>
            <div id='userDetails' className='w-1/3 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center py-2 mx-2 my-2 overflow-auto h-full'>
                <div id='userInfoHeader' className='display flex place-content-center m-2'>
                    <h2>User Information</h2>
                </div>

            <hr className='w-full'/>

            <div id='userFields' className='grid grid-col-1 place-content-center m-2'>
                <div id='userInfoSubSection' className='w-1/2'>
                <h4 className='m-1'>Username</h4>
                <input id='username' className='m-1' placeholder={username} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Email</h4>
                <input id='email' className='m-1' placeholder={email} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Password</h4>
                <input id='password' className='m-1' placeholder={password} readOnly={true} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>First Name</h4>
                <input id='first_name' className='m-1' placeholder={firstName} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Last Name</h4>
                <input id='last_name' className='m-1' placeholder={lastName} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
            </div>
        </div>
    </div>

    <div id='userContact' className='w-1/3 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2 overflow-auto h-full'>
        {/* Contact Information */}
        <div id='userContactBanner' className = 'display flex place-content-center m-2'>
                <h2>Contact Information</h2>
        </div>
        <hr className = 'w-full'/>

            <div id='contactFields' className = 'grid grid-col-1 place-content-center m-2'>
                <h4 className='m-1'>Address</h4>
                <input id='address' className='m-1' placeholder={address} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>City</h4>
                <input id='city' className='m-1' placeholder={city} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Country</h4>
                <input id='country' className='m-1' placeholder={country} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>   

                <h4 className='m-1'>Phone #</h4>
                <input id='phone_number' className='m-1' placeholder={phoneNum} readOnly={!isEditable} style={{ outline: isEditable ? "solid" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
            </div>
    </div>
</div>

        <div id='userSchedule' className = 'mb-10'>
            <h2 className = 'display flex place-content-center my-10 underline'>Your Schedule</h2>
            <TimeTable courses={courses}>
            </TimeTable>
        </div>

        <div id='userTuition&Credits' className='flex w-full justify-center mb-8'>
            <CreditComp courses={courses} />
            <TuitionComp courses={courses} />
        </div>

    </div>
  );
}
