import React from "react";
import { enrolledDuring } from "../../functions/scheduleFunctions";
import "tailwindcss/tailwind.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [];
for (let i = 7; i <= 15; i++) {
	times.push(i);
}

function TimeTable({ courses }) {
    return (
        <div className="w-full rounded-lg table-fixed border-2 border-black border-solid py-3">
            <table className="w-full ">
                <thead className=" border-b-2 border-black border-solid">
                    <tr>
                        <th className="w-1/6">Time/Day</th>
                        {days.map((day) => (
                            <th key={day} className="w-1/6">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time) => (
                        <tr key={time}>
                            <td className="border-2 text-center">{formatTime(time)}</td>
                            {days.map((day) => (
                                <td key={day} className=" relative text-center">
                                    <span className="absolute left-0 bottom-0">-</span>
                                    {enrolledDuring(day, time, courses).course.title ?
                                        ( <span className=" w-10 bg-[#BDBDBD] rounded-md px-1"> {enrolledDuring(day, time, courses).course.title.split(" ").map((word) => word.slice(0, 3)).join(" ")}</span>)
                                        :
                                        (<span></span>)
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
	);

	function formatTime(time) {
		if (time <= 12) {
			if (time < 12) {
				return `${time}:00 AM`;
			} else {
				return `${time}:00 PM`;
			}
		} else if (time > 12) {
			return `${time - 12}:00 PM`;
		}
	}
}

export default TimeTable;
