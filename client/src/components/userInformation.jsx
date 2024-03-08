import * as React from 'react';
import { Button } from '@mui/material';
import LogoTemp from '../assets/Registration_App_Logo.png';
import TimeTable from './timetable.jsx';
import TuitionComp from './tuitionComponent.jsx';
import CreditComp from './creditHours.jsx';


let address = '639 E Bullrush Pkwy';
let city = 'Lehi';
let country = 'USA';
let postal = '84043';
let phone = '801-123-4567'
let password = '*****';

export default function SearchAppBar(props) {
    const { courses, email, firstName, lastName, username } = props;

    const [isEditable, setIsEditable] = React.useState(false);
    const [value, setValue] = React.useState('');
    const handleInputChange = (event) => {
        setValue(event.target.value);
      };

  return (
    <div id='userPage' className = 'grid grid-cols-1'>
        <div id='userWelcome'>
            <h1 className = 'p-2'>
                Welcome {firstName}!
            </h1>
            <p className = 'p-2'>
                This is your profile page. Shows overall user details.
            </p>
        </div>

        <div id='userPicture' className='place-self-center m-4'>
            <img src={LogoTemp} className = 'rounded-full border-2 border-black border-solid w-80'/>
        </div>

        <div id='userInfoBanner' className = 'display flex place-content-center m-2'>
                <h2 className='py-2 mx-2'>My Account</h2>
                <Button variant='outlined' onClick={() => setIsEditable(!isEditable)} style={{width: 200}}>Edit / Save</Button>
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
                <input className='m-1' placeholder={username} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Email</h4>
                <input className='m-1' placeholder={email} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Password</h4>
                <input className='m-1' placeholder={password} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>First Name</h4>
                <input className='m-1' placeholder={firstName} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Last Name</h4>
                <input className='m-1' placeholder={lastName} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
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
                <input className='m-1' placeholder={address} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>City</h4>
                <input className='m-1' placeholder={city} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 className='m-1'>Country</h4>
                <input className='m-1' placeholder={country} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>   

                <h4 className='m-1'>Phone #</h4>
                <input className='m-1' placeholder={phone} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
            </div>
    </div>
</div>

        <div id='userSchedule' className = 'mb-10'>
            <h2 className = 'display flex place-content-center my-10 underline'>Your Schedule</h2>
            <TimeTable>
            </TimeTable>
        </div>

        <div id='userTuition&Credits' className='flex w-full justify-center mb-8'>
            <CreditComp />
            <TuitionComp />
        </div>

    </div>
  );
}
