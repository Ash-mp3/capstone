import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

//controllers
import addClass from '../../controllers/addClass';
import removeClass from '../../controllers/removeClass';
import Courses from './courses';


import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

//functions
import { formatSchedule } from '../../functions/scheduleFunctions';


import { useState, Fragment } from "react";

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText("#474787"),
	backgroundColor: "#474787",
	"&:hover": {
		backgroundColor: "#989898",
	},
}));

export default function AccordionCom(props) {
  const { title, description, tuition_cost, credit_hours, class_id, spots_left, enrolledIn, schedule, enrolledCourses, updateEnrolledCourses } = props


  const [snackOk, setSnackOk] = useState(false)
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState('')

	async function handleAddCourse(class_id) {
		class_id = `${class_id}`;
		const data = await addClass(class_id);
		if (data.ok) {
			updateEnrolledCourses([...enrolledCourses, { class_id: class_id }]);
		}
		setSnackMsg(data.msg);
		setSnackOk(data.ok);
		setOpenSnack(true)
	}
	async function handleRemoveCourse(class_id) {
		class_id = `${class_id}`;
		const data = await removeClass(class_id);
		if (data.ok) {
			updateEnrolledCourses(enrolledCourses.filter((enrolledCourse) => enrolledCourse.class_id !== class_id));
		}
		setSnackMsg(data.msg);
		setSnackOk(data.ok);
		setOpenSnack(true)
	}


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
		<Accordion sx={{ border: "1px solid gray" }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
				{title}
				{enrolledIn ? <div className="grow text-right">ENROLLED</div> : ""}
			</AccordionSummary>
			<AccordionDetails sx={{ borderTop: "1px solid gray" }}>
				<Typography>{description}</Typography>
				<br></br>
				<Typography>Tuition Cost: ${tuition_cost}</Typography>
				<Typography>Credit Hours: {credit_hours}</Typography>
				<Typography>Spots Left: {spots_left}</Typography>
        <Typography>Schedule: {formatSchedule(schedule)}</Typography>
			</AccordionDetails>
			<AccordionActions>
				{!enrolledIn ? (
					<ColorButton id="addCourse" className="w-[15%]" onClick={() => handleAddCourse(class_id)}>
						Add Course
					</ColorButton>
				) : (
					<ColorButton id="removeCourse" className="w-[15%]" onClick={() => handleRemoveCourse(class_id)}>
						Remove Course
					</ColorButton>
				)}
			</AccordionActions>
			<Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose} action={action} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleSnackClose} severity={snackOk ? "success" : "error"} ariant="filled" x={{ width: "100%" }}>
					{snackMsg}
				</Alert>
			</Snackbar>
		</Accordion>
	);
}
