import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EditUser from "./EditStudent";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText("#474787"),
	backgroundColor: "#474787",
	"&:hover": {
		backgroundColor: "#989898",
	},
}));

export default function AccordionRegistered({ user, onRemoveUser, allCourses, onEditUser, handleSnackOpen }) {
	const [courses, setCourses] = useState(user.courses);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [userPfp, setUserPfp] = useState("");


	useEffect(() => {
		// when a new user is created this page does not update so it cant see the username
		// console.log(user.username);
		setUserPfp(user.username.slice(0, 1));
	}, [user])
	const handleAddCourse = () => {
		let selectedCourseId;
		allCourses.forEach((course) => {
			if (course.title.toUpperCase() === selectedCourse.toUpperCase()) {
				selectedCourseId = course.class_id;
			}
		});
		if (selectedCourseId !== undefined) {
			fetch("/api/admin/addEnrollment", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					user_id: user.user_id,
					class_id: selectedCourseId,
				}),
			})
				.then((res) => {
					if (res.ok) {
						setCourses([
							...courses,
							{
								title: selectedCourse,
								class_id: selectedCourseId,
							},
						]);
					}
					return res.json();
				})
				.then((data) => {
					console.log(data)
					handleSnackOpen(data);
				});
		} 
	};

	const handleRemoveCourse = (courseToRemove) => {
		fetch("/api/admin/removeEnrollment", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				user_id: user.user_id,
				class_id: courseToRemove.class_id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					setCourses(courses.filter((course) => course !== courseToRemove));
				}
				return res.json();
			})
			.then((data) => {
				handleSnackOpen(data);
			});
	};

	const handleRemoveUserClick = (event) => {
		event.stopPropagation();
		onRemoveUser(user);
	};

	return (
		<Accordion sx={{ border: "1px solid gray", marginBottom: "10px" }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ borderBottom: "1px solid gray" }}>
				<Box display="flex" alignItems="center" width="100%">
					<Avatar>{userPfp}</Avatar>
					<Box flexGrow={1} ml={1}>
						{user.username}
					</Box>
					<ColorButton onClick={handleRemoveUserClick} className="w-auto">
						Remove Student
					</ColorButton>
				</Box>
			</AccordionSummary>
			{courses.map((course, index) => (
				<AccordionDetails key={index}>
					<Box display="flex" justifyContent="space-between" width="100%">
						<div>{course.title}</div>
						<ColorButton onClick={() => handleRemoveCourse(course)} className="w-1/5">
							Remove Course
						</ColorButton>
					</Box>
				</AccordionDetails>
			))}
			<AccordionActions>
				<Autocomplete
					options={allCourses}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => <TextField {...params} label="Courses" />}
					onChange={(event, newValue) => {
						setSelectedCourse(newValue?.title || "");
					}}
					className="w-full"
				/>
				<ColorButton onClick={handleAddCourse} className="w-1/5">
					Add Course
				</ColorButton>
				<EditUser user={user} onEditUser={onEditUser} />
			</AccordionActions>
		</Accordion>
	);
}
