import React from "react";

function CreditHours({ courses }) {
	// Calculate total credit hours
	// const classes = courses
	const totalCreditHours = courses.reduce((total, cls) => total + cls.credit_hours, 0);
	return (
		<div id="userCreditHours" className="w-1/3 h-full border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2">
			<div id="creditHoursBanner" className="display flex place-content-center m-2">
				<h2>Credit Hours</h2>
			</div>

			<hr className="w-full" />

			<div id="creditHoursFields" className="grid grid-col-1 place-content-center m-2">
				{courses.map((cls, index) => (
					<div key={index} id="creditHoursSubSection" className="w-full flex justify-between">
						<h4 className="m-3">{cls.title}</h4>
						<p className="m-3">{cls.credit_hours} hours</p>
					</div>
				))}
				<h2 className="m-1 underline justify-self-center">Total: {totalCreditHours} hours</h2>
			</div>
		</div>
	);
}

export default CreditHours;
