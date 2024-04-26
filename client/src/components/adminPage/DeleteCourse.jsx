import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function DeleteCourse({ course, onDeleteCourse }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      fetch(`/api/admin/deleteCourse`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(course),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
    } catch (err) {
        console.error(err)
    }
    onDeleteCourse(course);
    handleClose();
  };

  return (
    <div className='pt-2'>
      <Button className='w-full' variant="contained" color='error'  onClick={handleClickOpen}>
        Delete Course
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteCourse;
