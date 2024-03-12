import React from 'react';

// Example data
const classes = [
  { name: 'Math 101', tuition: 500 },
  { name: 'English 101', tuition: 500 },
  { name: 'Science 101', tuition: 500 },
  // Add more classes as needed
];

function TuitionFees() {
  // Calculate total tuition
  const totalTuition = classes.reduce((total, cls) => total + cls.tuition, 0);

  return (
    <div id='userTuitionFees' className='w-1/3 h-full border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2'>
      <div id='tuitionFeesBanner' className='display flex place-content-center m-2'>
        <h2>Tuition Fees</h2>
      </div>

      <hr className='w-full'/>

      <div id='tuitionFields' className='grid grid-col-1 place-content-center m-2'>
        {classes.map((cls, index) => (
          <div key={index} id='tuitionSubSection' className='w-full flex justify-between'>
            <h4 className='m-3'>{cls.name}</h4>
            <p className='m-3'>${cls.tuition}</p>
          </div>
        ))}
        <h2 className='m-1 underline justify-self-center'>Total: ${totalTuition}</h2>
      </div>
    </div>
  );
}

export default TuitionFees;
