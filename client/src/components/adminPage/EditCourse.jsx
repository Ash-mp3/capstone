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
            value={editedCourse.tuitionCost}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="creditHours"
            label="Credit Hours"
            type="number"
            value={editedCourse.creditHours}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            margin="dense"
            name="maximum_capacity"
            label="Maximum Capacity"
            type="number"
            value={editedCourse.creditHours}
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
