import React, { useState } from 'react';

function AddStudent({ onAddUser }) {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    temporaryPassword: '',
  });

  const handleInputChange = (event) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the student data to the server
    console.log(student);
    onAddUser({
        name: `${student.firstName} ${student.lastName}`,
        courses: [],//start with no courses
    }); // callback function with new student
    setStudent({
      firstName: '',
      lastName: '',
      email: '',
      temporaryPassword: '',

    });
  };

  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const buttonStyle = {
    backgroundColor: hover ? '#2C2F33' : '#474787',
    color: 'white',
  };

  return (
    <div className='pt-8 mb-4'>
      <h2 className='text-center underline text-xl font-bold py-2'>Add Student</h2>
      <form className='flex flex-col items-center justify-center w-full max-w-md mx-auto p-5  shadow-md rounded-md h-full' onSubmit={handleSubmit}>
        <label className='w-full mb-4'>
          First Name:
          <input className='w-full px-3 py-2 border rounded-md' type='text' name='firstName' value={student.firstName} onChange={handleInputChange} required />
        </label>
        <label className='w-full mb-4'>
          Last Name:
          <input className='w-full px-3 py-2 border rounded-md' type='text' name='lastName' value={student.lastName} onChange={handleInputChange} required />
        </label>
        <label className='w-full mb-4'>
          Email:
          <input className='w-full px-3 py-2 border rounded-md' type='text' name='email' value={student.email} onChange={handleInputChange} required /> 
        </label>
        <label className='w-full mb-4'>
          Temp Password:
          <input className='w-full px-3 py-2 border rounded-md' type='text' name='temporaryPassword' value={student.temporaryPassword} onChange={handleInputChange} required /> 
        </label>
        <label className='w-full mb-4'>
          Temporary Username:
          <input className='w-full px-3 py-2 border rounded-md' type='text' name='temporaryUsername' value={student.temporaryUsername} onChange={handleInputChange} required />
        </label>
        <button className='mt-20' style={buttonStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
