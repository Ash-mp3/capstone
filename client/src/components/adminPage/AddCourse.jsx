import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function CourseForm({ onAddCourse }) {
	const [openSnack, setOpenSnack] = useState(false);
	const [addCourseMsg, setAddCourseMsg] = useState();
	const [addCourseStatus, setAddCourseStatus] = useState();
	const [course, setCourse] = useState({
		title: "",
		description: "",
		tuition_cost: "",
		credit_hours: "",
		maximum_capacity: "",
		schedule: "",
		classroom_number: "",
	});

	const handleInputChange = (event) => {
		setCourse({
			...course,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			fetch(`/api/admin/createCourse`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(course),
			})
				.then((res) => res.json())
				.then((data) => {
					setAddCourseMsg(data.msg);
					setAddCourseStatus(data.success);
					handleSnackClick();
					onAddCourse(course);
				});
		} catch (err) {
			setAddCourseMsg("failed to create course");
			setAddCourseStatus(false);
			handleSnackClick();
		}
		setCourse({
			title: "",
			description: "",
			tuition_cost: "",
			credit_hours: "",
			maximum_capacity: "",
			schedule: "",
			classroom_number: "",
		});
	};

	const [hover, setHover] = useState(false);

	const toggleHover = () => {
		setHover(!hover);
	};

	const buttonStyle = {
		backgroundColor: hover ? "#2C2F33" : "#474787",
		color: "white",
	};

	const handleSnackClick = () => {
		setOpenSnack(true);
	};

	const handleSnackClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnack(false);
	};

	const action = (
		<Fragment>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</Fragment>
	);

	return (
		<div className="pt-8 mb-4">
			<h1 className="text-center underline text-xl font-bold py-2">Add Course</h1>
			<form className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-5 shadow-md rounded-md h-full bg-white" onSubmit={handleSubmit}>
				<label className="w-full mb-4">
					Title:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" type="text" name="title" value={course.title} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Description:
					<textarea className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" name="description" value={course.description} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Tuition Cost:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" type="number" name="tuition_cost" value={course.tuition_cost} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Credit Hours:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" type="number" name="credit_hours" value={course.credit_hours} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Maximum Capacity:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" type="number" name="maximum_capacity" value={course.maximum_capacity} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Schedule:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" name="schedule" value={course.schedule} onChange={handleInputChange} required />
				</label>
				<label className="w-full mb-4">
					Classroom Number:
					<input className="w-full px-3 py-2 rounded-md bg-[#D8D8D8]" name="classroom_number" value={course.classroom_number} onChange={handleInputChange} required />
				</label>
				<Button style={buttonStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} type="submit">
					Submit
				</Button>
				<Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose} action={action}>
					<Alert onClose={handleSnackClose} severity={addCourseStatus ? "success" : "error"} ariant="filled" x={{ width: "100%" }}>
						{addCourseMsg}
					</Alert>
				</Snackbar>
			</form>
		</div>
	);
}

export default CourseForm;
