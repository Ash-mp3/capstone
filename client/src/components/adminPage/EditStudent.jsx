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

function EditUser({ user, onEditUser }) {
	const [open, setOpen] = useState(false);
	const [editedUser, setEditedUser] = useState({
		username: user.username ? user.username : "",
		email: user.email ? user.email : "",
		first_name: user.first_name ? user.first_name : "",
		last_name: user.last_name ? user.last_name : "",
		phone_number: user.phone_number ? user.phone_number : "",
		address: user.address ? user.address : "",
		city: user.city ? user.city : "",
		country: user.country ? user.country : "",
        password: '',
        id: user.user_id ? user.user_id : '',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		const editedUserData = {
			userId: editedUser.id,
			userInfo: {
				username: editedUser.username,
				email: editedUser.email,
				first_name: editedUser.first_name,
				last_name: editedUser.last_name,
				phone_number: editedUser.phone_number,
				address: editedUser.address,
				city: editedUser.city,
				country: editedUser.country,
				password: editedUser.password,
			},
		};
		try {
			fetch(`/api/admin/editUser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(editedUserData),
			})
				.then((res) => res.json())
				.then((data) => {
					onEditUser(data.msg);
				});
		} catch (err) {
			console.error(err);
		}

		handleClose();
	};

	const handleChange = (event) => {
		setEditedUser({
			...editedUser,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div>
			<ColorButton variant="contained" onClick={handleClickOpen}>
				Edit
			</ColorButton>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit User</DialogTitle>
				<DialogContent>
					<DialogContentText>Please edit the user details here.</DialogContentText>
					<TextField autoFocus margin="dense" name="first_name" label="First name" type="text" value={editedUser.first_name} onChange={handleChange} fullWidth />
					<TextField autoFocus margin="dense" name="last_name" label="Last name" type="text" value={editedUser.last_name} onChange={handleChange} fullWidth />
					<TextField autoFocus margin="dense" name="username" label="Username" type="text" value={editedUser.username} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="email" label="Email" type="email" value={editedUser.email} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="password" label=" New password" type="text" placeholder="*****" value={editedUser.password} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="phone_number" label="Phone Number" type="tel" value={editedUser.phone_number} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="address" label="Address" type="text" value={editedUser.address} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="city" label="City" type="text" value={editedUser.city} onChange={handleChange} fullWidth />
					<TextField margin="dense" name="country" label="Country" type="text" value={editedUser.country} onChange={handleChange} fullWidth />
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
