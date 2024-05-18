import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#474787"),
    backgroundColor: "#474787",
    "&:hover": {
        backgroundColor: "#989898",
    },
}));

function EditCourse({ course, onEditCourse }) {
	const [open, setOpen] = useState(false);
    const [editedCourse, setEditedCourse] = useState({ ...course });
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = async () => {
		try {
			fetch(`/api/admin/editCourse`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(editedCourse),
			})
				.then((res) => res.json())
				.then((data) => {
					onEditCourse(editedCourse, data.msg);
				});
		} catch (err) {
			console.error(err);
		}

		handleClose();
	};

	const handleChange = (event) => {
		setEditedCourse({
			...editedCourse,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div>
			<ColorButton className="w-full" variant="contained"  onClick={handleClickOpen}>
				Edit Course
			</ColorButton>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Course</DialogTitle>
				<DialogContent>
					<DialogContentText>Please edit the course details here.</DialogContentText>
					<TextField autoFocus margin="dense" name="title" label="Title" type="text" value={editedCourse.title} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="tuition_cost" label="Tuition Cost" type="number" value={editedCourse.tuition_cost} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="credit_hours" label="Credit Hours" type="number" value={editedCourse.credit_hours} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="maximum_capacity" label="Maximum Capacity" type="number" value={editedCourse.maximum_capacity} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="classroom_number" label="Classroom Number" type="text" value={editedCourse.classroom_number} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="schedule" label="Schedule" type="text" value={editedCourse.schedule} onChange={handleChange} fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditCourse;
