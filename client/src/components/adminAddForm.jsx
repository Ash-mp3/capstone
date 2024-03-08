import React, { useState } from 'react';

function CourseForm() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    tuition_cost: '',
    credit_hours: '',
  });

  const handleInputChange = (event) => {
    setCourse({
      ...course,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the course data to the server
    console.log(course);
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
    <div className='pt-8'>
    <h1 className='text-center underline text-xl font-bold py-2'>Add Courses</h1>
    <form className='flex flex-col items-center justify-center w-full max-w-md mx-auto p-5 shadow-md rounded-md' onSubmit={handleSubmit}>
      <label className='w-full mb-4'>
        Title:
        <input className='w-full px-3 py-2 border rounded-md' type='text' name='title' value={course.title} onChange={handleInputChange} required />
      </label>
      <label className='w-full mb-4'>
        Description:
        <textarea className='w-full px-3 py-2 border rounded-md' name='description' value={course.description} onChange={handleInputChange} required />
      </label>
      <label className='w-full mb-4'>
        Tuition Cost:
        <input className='w-full px-3 py-2 border rounded-md' type='number' name='tuition_cost' value={course.tuition_cost} onChange={handleInputChange} required />
      </label>
      <label className='w-full mb-4'>
        Credit Hours:
        <input className='w-full px-3 py-2 border rounded-md' type='number' name='credit_hours' value={course.credit_hours} onChange={handleInputChange} required />
      </label>
      <button 
          style={buttonStyle} 
          onMouseEnter={toggleHover} 
          onMouseLeave={toggleHover} 
          type='submit'
        >
            Submit
        </button>
    </form>
    </div>
  );
}

export default CourseForm;
