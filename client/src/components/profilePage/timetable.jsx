import React from 'react';
import 'tailwindcss/tailwind.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = [];
for(let i = 7; i <= 16; i++) {
  const period = i >= 12 ? 'PM' : 'AM';
  let hour = i > 12 ? i - 12 : i;
  hour = hour === 0 ? 12 : hour; // handle noon and midnight
  times.push(`${hour}:00 ${period}`);
  if(i !== 16) times.push(`${hour}:30 ${period}`);
}


function TimeTable({ courses }) {
  
  console.log(courses)
  return (
    <table className="table-fixed border-2 border-black w-full">
      <thead>
        <tr>
          <th className="w-1/6 border-2 border-black">Time/Day</th>
          {days.map(day => <th key={day} className="w-1/6 border-2 border-black">{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {times.map(time => (
          <tr key={time}>
            <td className="border-2 border-black">{time}</td>
            {days.map(day => <td key={day} className="border-2 border-black">-</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TimeTable;
