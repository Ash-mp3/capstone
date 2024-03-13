import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function EditCourse({ course, onEditCourse }) {
  const [open, setOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState({ ...course });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onEditCourse(editedCourse);
    handleClose();
  };

  const handleChange = (event) => {
    setEditedCourse({ ...editedCourse, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Course
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the course details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            value={editedCourse.title}
            onChange={handleChange}
            fullWidth
          />
        <TextField
            margin="dense"
            name="tuitionCost"
            label="Tuition Cost"
            type="number"
            value={editedCourse.tuition_Cost}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="creditHours"
            label="Credit Hours"
            type="number"
            value={editedCourse.credit_Hours}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="maximum_capacity"
            label="Maximum Capacity"
            type="number"
            value={editedCourse.maximum_capacity}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="classroom_number"
            label="Classroom Number"
            type="number"
            value={editedCourse.classroom_number}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="schedule"
            label="Schedule"
            type="number"
            value={editedCourse.schedule}
            onChange={handleChange}
            fullWidth
        />
          {/* Add more fields as necessary */}
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
