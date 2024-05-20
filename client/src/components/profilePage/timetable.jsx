import React from 'react';
import { enrolledDuring } from '../../functions/scheduleFunctions';
import 'tailwindcss/tailwind.css'

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [];
for(let i = 7; i <= 15; i++) {
  times.push(i)
}



function TimeTable({ courses }) {

  return (
    <table className="table-fixed border-black border-red w-full ">
      <thead>
        <tr>
          <th className="w-1/6 border-2 border-black">Time/Day</th>
          {days.map(day => <th key={day} className="w-1/6 border-2 border-black">{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {times.map(time => (
          <tr key={time}>
            <td className="border-2 border-black text-center">{formatTime(time)}</td>
            {days.map(day => 
            <td key={day} className="border-2 border-black relative text-center">
              <span className='absolute left-0'>-</span>
              <span className='w-10'>
              { 
                enrolledDuring(day, time, courses).course.title
              }
              </span>
            </td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );


  function formatTime(time){
    if(time <= 12){
      if(time < 12){
        return(`${time}:00 AM`)
      } else {
        return(`${time}:00 PM`)
      }
    } 
    else if(time > 12){
      return(`${time-12}:00 PM`)
    }
  }

}

export default TimeTable;
