import React from 'react';

// Example data
const classes = [
  { name: 'Math 101', creditHours: 3 },
  { name: 'English 101', creditHours: 3 },
  { name: 'Science 101', creditHours: 4 },
  // Add more classes as needed
];

function CreditHours() {
  // Calculate total credit hours
  const totalCreditHours = classes.reduce((total, cls) => total + cls.creditHours, 0);

  return (
    <div id='userCreditHours' className='w-1/3 h-full border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2'>
      <div id='creditHoursBanner' className='display flex place-content-center m-2'>
        <h2>Credit Hours</h2>
      </div>

      <hr className='w-full'/>

      <div id='creditHoursFields' className='grid grid-col-1 place-content-center m-2'>
        {classes.map((cls, index) => (
          <div key={index} id='creditHoursSubSection' className='w-full flex justify-between'>
            <h4 className='m-3'>{cls.name}</h4>
            <p className='m-3'>{cls.creditHours} hours</p>
          </div>
        ))}
        <h2 className='m-1 underline justify-self-center'>Total: {totalCreditHours} hours</h2>
      </div>
    </div>
  );
}

export default CreditHours;
