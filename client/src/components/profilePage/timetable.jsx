import React from "react";
import "tailwindcss/tailwind.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [];
for (let i = 7; i <= 15; i++) {
	const period = i >= 12 ? "PM" : "AM";
	let hour = i > 12 ? i - 12 : i;
	hour = hour === 0 ? 12 : hour; // handle noon and midnight
	times.push(`${hour}:00 ${period}`);
}

function TimeTable({ courses }) {
	return (
		<table className="table-fixed border-black border-red w-full ">
			<thead>
				<tr>
					<th className="w-1/6 border-2 border-black">Time/Day</th>
					{days.map((day) => (
						<th key={day} className="w-1/6 border-2 border-black">
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{times.map((time) => (
					<tr key={time}>
						<td className="border-2 border-black text-center">{time}</td>
						{days.map((day) => (
							<td key={day} className="border-2 border-black relative text-center">
								<span className="absolute left-0">-</span>
								<span className="w-10">{}</span>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TimeTable;
