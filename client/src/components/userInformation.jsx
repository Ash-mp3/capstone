import * as React from 'react';
import { Button } from '@mui/material';
import LogoTemp from '../assets/Registration_App_Logo.png'


let user = 'Sergio';
let username = 'Wackyprogamer';
let email = 'wackyprogamer@gmail.com';
let firstName = 'Sergio';
let lastName = 'Castillo';
let address = '639 E Bullrush Pkwy';
let city = 'Lehi';
let country = 'USA';
let postal = '84043';
let phone = '801-123-4567'
let password = '*****';

export default function SearchAppBar() {

    const [isEditable, setIsEditable] = React.useState(false);
    const [value, setValue] = React.useState('');
    const handleInputChange = (event) => {
        setValue(event.target.value);
      };

  return (
    <div id='userPage' class = 'grid grid-cols-1'>
        <div id='userWelcome'>
            <h1 class = 'p-2'>
                Welcome {user}!
            </h1>
            <p class = 'p-2'>
                This is your profile page. Shows overall user details.
            </p>
        </div>

        <div id='userPicture' class='place-self-center m-4'>
            <img src={LogoTemp} class = 'rounded-full border-2 border-black border-solid w-80'/>
        </div>

        <div id='userInfoBanner' class = 'display flex place-content-center m-2 w-full'>
                <h2 class='py-2 mx-2'>My Account</h2>
                <Button variant='outlined' onClick={() => setIsEditable(!isEditable)} style={{width: 200}}>Edit / Save</Button>
        </div>

        <div id='userDetails' class = 'w-1/4 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center py-2'>

            <div id='userInfoBanner' class = 'display flex place-content-center m-2'>
                <h2>User Information</h2>
            </div>

            <hr class = 'w-full'/>

            <div id='userFields' class = 'grid grid-col-1 place-content-center m-2'>
                    <div id='userInfoSubSection' class='w-1/2'>
                        <h4 class='m-1'>Username</h4>
                        <input class='m-1' placeholder={username} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                        <h4 class='m-1'>Email</h4>
                        <input class='m-1' placeholder={email} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                        <h4 class='m-1'>Password</h4>
                        <input class='m-1' placeholder={password} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                        <h4 class='m-1'>First Name</h4>
                        <input class='m-1' placeholder={firstName} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                        <h4 class='m-1'>Last Name</h4>
                        <input class='m-1' placeholder={lastName} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
                    </div>
            </div>

        </div>

        <div id='userContact' class = 'w-1/4 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 py-2'>

            <div id='userContactBanner' class = 'display flex place-content-center m-2'>
                <h2>Contact Information</h2>
            </div>

            <hr class = 'w-full'/>

            <div id='contactFields' class = 'grid grid-col-1 place-content-center m-2'>
                <h4 class='m-1'>Address</h4>
                <input class='m-1' placeholder={address} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 class='m-1'>City</h4>
                <input class='m-1' placeholder={city} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>

                <h4 class='m-1'>Country</h4>
                <input class='m-1' placeholder={country} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>   

                <h4 class='m-1'>Phone #</h4>
                <input class='m-1' placeholder={phone} readOnly={!isEditable} style={{ outline: isEditable ? "" : "none", color: isEditable ? "black" : "grey" }} onChange={handleInputChange}></input>
            </div>
        </div>
        
        <div id='userSchedule'>
            <h2>Schedule</h2>
        </div>

        <div id='userTuitionFees'>
            <h2>Tuition Fees</h2>
        </div>

        <div id='totalCreditHours'>
            <h2>Total credit Hours</h2>
        </div>



    </div>

    
  );
}
