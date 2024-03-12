import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function EditUser({ user, onEditUser }) {
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onEditUser(editedUser);
    handleClose();
  };

  const handleChange = (event) => {
    setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the user details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            value={editedUser.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            value={editedUser.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            value={editedUser.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            value={editedUser.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            value={editedUser.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            value={editedUser.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="country"
            label="Country"
            type="text"
            value={editedUser.country}
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

export default EditUser;
