import { useContext, useEffect, useState, useRef } from "react";
import "../../css/courses.css";
import ResponsiveAppBar from "../ResponsiveAppBar";
import Footer from "../Footer";
import AccordionRegistered from "./AccordionRegistered";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { SearchContext } from "../SearchContext";
import AddCourse from "./AddCourse";
import AddStudent from "./AddStudent";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import handleStatus from "../../controllers/handleStatus";
import AuthDisplay from "../AuthDisplay";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import logoImg from "../assets/Registration_App_Logo.png";

function Admin() {
	const [allCourses, setAllCourses] = useState([]);
	const [users, setUsers] = useState([]);
	const [authorizeStatus, setAuthorizeStatus] = useState("loading...");

	// Fetch the list of all courses when the component mounts
	useEffect(() => {
		fetch(`/api/courses`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				setAuthorizeStatus(handleStatus(res));
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setAllCourses(data.courses);
			});
	}, [allCourses]);

	useEffect(() => {
		fetch("/api/admin/userList", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					console.error("Failed to fetch users");
					return;
				}
			})
			.then((data) => {
				setUsers(data);
			});
	}, [users]);

	const [toastOpen, setToastOpen] = useState(false);
	const toastMessage = useRef("");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [userToRemove, setUserToRemove] = useState(null);

	const { searchTerm, setSearchTerm } = useContext(SearchContext);

	const filteredUsers = users.filter((user) => user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()));

	const handleAddCourse = (newCourse) => {
		setAllCourses([...allCourses, newCourse]);
	};

	const handleAddUser = (newUser) => {
		setUsers([...users, newUser]);
	};

	const handleRemoveUser = () => {
		toastMessage.current = `Removed student: ${userToRemove.username}`;
		fetch("/api/admin/removeUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ user_id: userToRemove.user_id }),
		}).then((res) => {
			if (res.ok) {
				setUsers(users.filter((user) => user !== userToRemove));
			}
		});

		const msg = `Removed student: ${userToRemove.username}`;
		openSnackBar(msg);
		setDialogOpen(false);
	};

	const handleOpenDialog = (user) => {
		setUserToRemove(user);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleCloseToast = () => {
		setToastOpen(false);
	};

	const handleEditUser = (msg) => {
		openSnackBar(msg);
	};

	const [selectedCourse, setSelectedCourse] = useState(null);

	const handleEditCourse = (editedCourse, msg) => {
		let updatedCourses = [];
		for (const course of allCourses) {
			if (course.class_id === editedCourse.class_id) {
				updatedCourses.push(editedCourse);
			} else {
				updatedCourses.push(course);
			}
        }
        setSelectedCourse(null);
        setAllCourses(updatedCourses);
        openSnackBar(msg);
	};

	const handleDeleteCourse = (deletedCourse, msg) => {
		let updatedCourses = [];
		for (const course of allCourses) {
			if (course.class_id !== deletedCourse.class_id) {
				updatedCourses.push(course);
			}
        }
        setSelectedCourse(null);
        setAllCourses(updatedCourses);
        openSnackBar(msg);
	};

	//this function will handle snackbar messages
	const openSnackBar = (msg, type) => {
		toastMessage.current = msg || toastMessage;
		setToastOpen(true);
	};

	return (
		<div>
			{authorizeStatus === "authorized" ? (
				<div id="AdminPage" className="w-full bg-[#ECECEC]">
					<ResponsiveAppBar onSearch={setSearchTerm} />

					<div className="flex justify-evenly pb-8 relative">
						<div className="w-1/4 absolute top-[25%] opacity-50 blur-sm">
							<img src={logoImg} alt="Registration App Logo" className="w-full" />
						</div>
						<AddCourse onAddCourse={handleAddCourse} />
						<div className="w-1/4 pt-8 relative">
							<h1 className="text-center underline text-xl font-bold py-2">Edit course</h1>
							<div className=" w-full max-w-md mx-auto p-5 shadow-md rounded-md h-auto bg-white">
								<Autocomplete
									options={allCourses}
									getOptionLabel={(option) => option.title}
									renderInput={(params) => <TextField {...params} label="Select a course" />}
									onChange={(event, newValue) => {
										setSelectedCourse(newValue);
									}}
								/>
								{selectedCourse && (
									<div className="mt-10">
										<EditCourse course={selectedCourse} onEditCourse={handleEditCourse} variant="contained" />
										<DeleteCourse course={selectedCourse} onDeleteCourse={handleDeleteCourse} />
									</div>
								)}
							</div>
							<div className="absolute w-full bottom-[-28px]">
								<h1 className="text-center underline text-xl font-bold py-2">Stats</h1>
								<div className="w-full max-w-md mx-auto p-5 shadow-md rounded-md h-1/4 bg-white">
									<p className="flex justify-between border-b-[1px] border-black border-solid ">
										<span>Total number of students</span>
										<span>{users.length}</span>
									</p>
									<p className="flex justify-between">
										<span>Total number of courses</span>
										<span>{allCourses.length}</span>
									</p>
								</div>
							</div>
						</div>
						<AddStudent onAddUser={handleAddUser} />
					</div>

					<div id="registeredUsers" className="grid grid-cols-1 place-items-center">
						<h1 className="underline text-xl font-bold py-2 mt-20 mb-10">Registered Students</h1>
						<div id="studentSection" className="flex w-full justify-center">
							<div id="studentAccordion" className="w-4/5 pb-4">
								{filteredUsers.map((user, index) => (
									<div key={user.user_id}>
										<AccordionRegistered key={user.user_id} user={user} onRemoveUser={handleOpenDialog} allCourses={allCourses} onEditUser={handleEditUser} openSnackBar={openSnackBar} />
									</div>
								))}
							</div>
						</div>
					</div>
					<Footer />
					<Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleCloseToast} message={toastMessage.current} />
					<Dialog open={dialogOpen} onClose={handleCloseDialog}>
						<DialogTitle>{"Confirm Delete"}</DialogTitle>
						<DialogContent>
							<DialogContentText>Are you sure you want to remove this student?</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog}>Cancel</Button>
							<Button onClick={handleRemoveUser} autoFocus>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			) : (
				<AuthDisplay authorizeStatus={authorizeStatus} />
			)}
		</div>
	);
}

export default Admin;
