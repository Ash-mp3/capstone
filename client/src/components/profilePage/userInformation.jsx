import { useState, useEffect, Fragment } from "react";
import { Button } from "@mui/material";
import TimeTable from "./timetable.jsx";
import TuitionComp from "./tuitionComponent.jsx";
import CreditComp from "./creditHours.jsx";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function userInformation(props) {
	const { courses, username, email, firstName, lastName, phoneNum, address, city, country } = props;
	const [userInfo, setUserInfo] = useState();
    const [isEditable, setIsEditable] = useState();
	const [snackOk, setSnackOk] = useState(false)
  	const [openSnack, setOpenSnack] = useState(false);
  	const [snackMsg, setSnackMsg] = useState('')

	useEffect(() => {
		setUserInfo({ username: username, email: email, first_name: firstName, last_name: lastName, phone_number: phoneNum, address: address, city: city, country: country, password: "" });
	}, [props]);

	const handleInputChange = (event) => {
		setUserInfo({ ...userInfo, [event.currentTarget.id]: event.target.value });
    };

	const updateUserInfo = async () => {
		if (isEditable) {
			try {
				fetch(`/api/updateUser`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(userInfo),
				})
					.then((res) => res.json())
                    .then((data) => {
                        setSnackMsg(data.msg);
						setSnackOk(data.success);
						setOpenSnack(true);
					});
			} catch (err) {
				console.error(err);
			}
		}
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
		<div id="userPage" className="grid grid-cols-1 mt-2">
			<div id="userPicture" className="place-self-center m-4">
				<Avatar
					className="rounded-full border-2 border-black border-solid w-80"
					sx={{ borderRadius: "100%", border: "2px", borderColor: "black", borderStyle: "solid", width: "320px", height: "320px", fontSize: "200px" }}
				>
					{username.charAt(0).toUpperCase()}
				</Avatar>
			</div>
			<div id="userInfoBanner" className="display flex place-content-center m-4">
				<h2 className="py-2 mx-2 underline">Account Info</h2>
			</div>
			<div id="userInfo&Contact" className="flex w-full justify-center">
				<div id="userDetails" className="w-1/3 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center py-2 mx-2 my-2 overflow-auto h-full">
					<div id="userInfoHeader" className="display flex place-content-center m-2">
						<h2>User Information</h2>
					</div>
					<hr className="w-full" />
					<div id="userFields" className="grid grid-col-1 place-content-center m-2">
						<div id="userInfoSubSection" className="w-1/2">
							<h4 className="m-1">Username</h4>
							<input
								type="text"
								id="username"
								className="m-1 p-[2px]"
								placeholder={username}
								readOnly={!isEditable}
								disabled={!isEditable}
								style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
								onChange={handleInputChange}
							></input>
							<h4 className="m-1">Email</h4>
							<input
								type="text"
								id="email"
								className="m-1 p-[2px]"
								placeholder={email}
								readOnly={!isEditable}
								disabled={!isEditable}
								style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
								onChange={handleInputChange}
							></input>
							<h4 className="m-1">Password</h4>
							<input
								type="text"
								id="password"
								className="m-1 p-[2px]"
								placeholder={"*****"}
								readOnly={!isEditable}
								disabled={!isEditable}
								style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
								onChange={handleInputChange}
							></input>
							<h4 className="m-1">First Name</h4>
							<input
								type="text"
								id="first_name"
								className="m-1 p-[2px]"
								placeholder={firstName}
								readOnly={!isEditable}
								disabled={!isEditable}
								style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
								onChange={handleInputChange}
							></input>
							<h4 className="m-1">Last Name</h4>
							<input
								type="text"
								id="last_name"
								className="m-1 p-[2px]"
								placeholder={lastName}
								readOnly={!isEditable}
								disabled={!isEditable}
								style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
								onChange={handleInputChange}
							></input>
						</div>
					</div>
				</div>
				<div id="userContact" className="w-1/3 border-2 border-solid border-black place-self-center rounded-md grid grid-col-2 place-content-center my-2 mx-2 py-2 overflow-auto h-full">
					<div id="userContactBanner" className="flex place-content-center m-2">
						<h2>Contact Information</h2>
					</div>
					<hr className="w-full" />
					<div id="contactFields" className="grid grid-col-1 place-content-center m-2">
						<h4 className="m-1">Address</h4>
						<input
							id="address"
							className="m-1 p-[2px]"
							placeholder={address}
							readOnly={!isEditable}
							disabled={!isEditable}
							style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
							onChange={handleInputChange}
						></input>
						<h4 className="m-1">City</h4>
						<input
							id="city"
							className="m-1 p-[2px]"
							placeholder={city}
							readOnly={!isEditable}
							disabled={!isEditable}
							style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
							onChange={handleInputChange}
						></input>
						<h4 className="m-1">Country</h4>
						<input
							id="country"
							className="m-1 p-[2px]"
							placeholder={country}
							readOnly={!isEditable}
							disabled={!isEditable}
							style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
							onChange={handleInputChange}
						></input>
						<h4 className="m-1">Phone #</h4>
						<input
							id="phone_number"
							className="m-1 p-[2px]"
							placeholder={phoneNum}
							readOnly={!isEditable}
							disabled={!isEditable}
							style={{ backgroundColor: isEditable ? "#D8D8D8" : "white", color: isEditable ? "black" : "grey", borderRadius: "5px" }}
							onChange={handleInputChange}
						></input>
					</div>
				</div>
			</div>
			<div id="submitForm" className="w-full h-14 mt-4 flex justify-center items-center">
				<Button
					variant="outlined"
					onClick={() => {
						setIsEditable(!isEditable);
						updateUserInfo();
					}}
					style={{ width: 200 }}
				>
					{!isEditable ? "Edit" : "Save"}
				</Button>
			</div>
			<div id="userSchedule" className="mb-10 mx-10 border-2">
				<h2 className="display flex place-content-center my-10 underline">Your Schedule</h2>
				<TimeTable courses={courses} ></TimeTable>
			</div>
			<div id="userTuition&Credits" className="flex w-full justify-center mb-8">
				<CreditComp courses={courses} />
				<TuitionComp courses={courses} />
            </div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose} action={action} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleSnackClose} severity={snackOk ? "success" : "error"} ariant="filled" x={{ width: "100%" }}>
					{snackMsg}
				</Alert>
			</Snackbar>
        </div>
	);
}
