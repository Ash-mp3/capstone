import React from 'react';

// Example data
const classes = [
  { title: 'Math 101', tuition_cost: 500 },
  { title: 'English 101', tuition_cost: 500 },
  { title: 'Science 101', tuition_cost: 500 },
  // Add more classes as needed
];

function TuitionFees({courses}) {
  // Calculate total tuition
  const totalTuition = courses.reduce((total, cls) => total + Math.trunc(cls.tuition_cost), 0);
  return (
    <div id='userTuitionFees' className='w-1/3 h-full border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2'>
      <div id='tuitionFeesBanner' className='display flex place-content-center m-2'>
        <h2>Tuition Fees</h2>
      </div>

      <hr className='w-full'/>

      <div id='tuitionFields' className='grid grid-col-1 place-content-center m-2'>
        {courses.map((cls, index) => (
          <div key={index} id='tuitionSubSection' className='w-full flex justify-between'>
            <h4 className='m-3'>{cls.title}</h4>
            <p className='m-3'>${cls.tuition_cost}</p>
          </div>
        ))}
        <h2 className='m-1 underline justify-self-center'>Total: ${totalTuition}</h2>
      </div>
    </div>
  );
}

export default TuitionFees;
