import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';

function AddStudent({ onAddUser }) {
  const [openSnack, setOpenSnack] = useState(false)
  const [addUserMsg, setAddUserMsg] = useState()
  const [addUserStatus, setAddUserStatus] = useState()
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    temporaryPassword: "",
    temporaryUsername: "",
  });

  const handleInputChange = (event) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      fetch(`/api/admin/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(student),
      })
        .then((res) => res.json())
        .then((data) => {
          setAddUserMsg(data.msg)
          setAddUserStatus(data.success)
          handleSnackClick();
          onAddUser({
            name: `${student.firstName} ${student.lastName}`,
            courses: [],
        });
        });
    } catch (err) {
        console.error(err)
        setAddUserMsg('failed to create course')
        setAddUserStatus(false)
        handleSnackClick();
    }
  
    setStudent({
      firstName: '',
      lastName: '',
      email: '',
      temporaryPassword: '',
      temporaryUsername: ''
    });
  };

  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const buttonStyle = {
    backgroundColor: hover ? '#2C2F33' : '#474787',
    color: 'white',
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='pt-8 mb-4'>
      <h2 className='text-center underline text-xl font-bold py-2'>Add Student</h2>
      <form className='flex flex-col items-center justify-around w-full max-w-md mx-auto p-5 shadow-md rounded-md h-full bg-white' onSubmit={handleSubmit}>
        <label className='w-full mb-14 mt-4'>
          First Name:
          <input className='w-full px-3 py-2 rounded-md bg-[#D8D8D8]' type='text' name='firstName' value={student.firstName} onChange={handleInputChange} required />
        </label>
        <label className='w-full mb-14'>
          Last Name:
          <input className='w-full px-3 py-2 rounded-md bg-[#D8D8D8]' type='text' name='lastName' value={student.lastName} onChange={handleInputChange} required />
        </label>
        <label className='w-full mb-14'>
          Email:
          <input className='w-full px-3 py-2 rounded-md bg-[#D8D8D8]' type='text' name='email' value={student.email} onChange={handleInputChange} required /> 
        </label>
        <label className='w-full mb-14'>
          Temporary Password:
          <input className='w-full px-3 py-2 rounded-md bg-[#D8D8D8]' type='text' name='temporaryPassword' value={student.temporaryPassword} onChange={handleInputChange} required /> 
        </label>
        <label className='w-full mb-2'>
          Temporary Username:
          <input className='w-full px-3 py-2 rounded-md bg-[#D8D8D8]' type='text' name='temporaryUsername' value={student.temporaryUsername} onChange={handleInputChange} required />
        </label>
        <div className='w-full flex justify-center '>
          <Button className='mb-4' style={buttonStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} type='submit'>Submit</Button>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          action={action}
        >
          <Alert
            onClose={handleSnackClose}
            severity={addUserStatus ? "success" : "error"}
            ariant="filled"
            x={{ width: '100%' }}
          >
            {addUserMsg}
          </Alert>
        </Snackbar>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
