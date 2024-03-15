import React, { useContext } from 'react';
import '../../css/courses.css'
import ResponsiveAppBar from "../ResponsiveAppBar";
import Footer from "../Footer";
import AccordionRegistered from './AccordionRegistered';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { SearchContext } from '../SearchContext';
import AddCourse from './adminAddForm';
import AddStudent from './AddStudent';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';
import handleStatus from '../../controllers/handleStatus';
import AuthDisplay from '../AuthDisplay'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Admin() {

  const [allCourses, setAllCourses] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [authorizeStatus, setAuthorizeStatus] = React.useState("loading...")

  
  // Fetch the list of all courses when the component mounts
React.useEffect(() => {
  fetch(`/api/courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
  .then((res) => {
    setAuthorizeStatus(handleStatus(res))
    if(res.ok){
      return(res.json())
    }
  })
  .then((data) => {
    setAllCourses(data.courses)
  });
}, [allCourses]);


React.useEffect(() => {
  fetch("/api/admin/userList", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
  .then((res) => {
    if(res.status === 200){
      return(res.json())
    } else {
      console.error('Failed to fetch users');
      return;
    }
  })
  .then((data) => {
    setUsers(data)
  });
}, [users]);



  const [toastOpen, setToastOpen] = React.useState(false);
  const toastMessage = React.useRef('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [userToRemove, setUserToRemove] = React.useState(null);

  const {searchTerm, setSearchTerm} = useContext(SearchContext);

  const filteredUsers = users.filter(user => 
    user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = (newCourse) => {
    setAllCourses([...allCourses, newCourse])
  }
  
  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = () => {
    setUsers(users.filter(user => user !== userToRemove));
    setToastMessage(`Removed student: ${userToRemove.username}`);
    fetch("/api/admin/removeUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({user_id: userToRemove.user_id})
    })
    const msg = (`Removed student: ${userToRemove.username}`);
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

  const handleEditUser = (editedUser) => {
    // Logic to update the user details goes here.
    // This could involve making a request to your server to update the user details in your database.
    // Remember to handle the state updates correctly to ensure your UI is consistent with your data.
  };

  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleEditCourse = (editedCourse) => {
    let updatedCourses = []
    for (const course of allCourses) {
      if (course.class_id === editedCourse.class_id) {
        updatedCourses.push(editedCourse)
      } else {
        updatedCourses.push(course)
      }
    }
    setAllCourses(updatedCourses)
  };

  const handleDeleteCourse = (deletedCourse) => {
    let updatedCourses = []; 
    for (const course of allCourses) {
      if (course.class_id !== deletedCourse.class_id) {
        updatedCourses.push(course)
      }
    }
    setAllCourses(updatedCourses)
  };
  
//this function will handle snackbar messages
const openSnackBar = ((msg, type) => {
  toastMessage.current = msg || toastMessage
  setToastOpen(true)
})

  return (
    <div>
    {
    authorizeStatus === 'authorized' ?
    
    <div id='AdminPage' className='w-full'>
      <ResponsiveAppBar onSearch={setSearchTerm}/>

      <div className='flex justify-evenly pb-8'>
        <AddCourse onAddCourse={handleAddCourse} />
        <AddStudent onAddUser={handleAddUser} />
        <div className='w-1/4 pt-8 mt-10'>
          <Autocomplete
          className=''
          options={allCourses}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Select a course" />}
          onChange={(event, newValue) => {
            
            setSelectedCourse(newValue);
          }}
        />
        {selectedCourse && (
          <div className='mt-20'>
            <EditCourse course={selectedCourse} onEditCourse={handleEditCourse} />
            <DeleteCourse course={selectedCourse} onDeleteCourse={handleDeleteCourse} />
          </div>
        )}
        </div>
        
      </div>

      <div id='registeredUsers' className='grid grid-cols-1 place-items-center'>
        <h1 className='underline font-bold py-2'>Registered Students</h1>
        <div id='studentSection' className='flex w-full justify-center'>
          <div id='studentAccordion' className='w-4/5 pb-4'>
          {filteredUsers.map((user, index) => (
            <div key={user.username}>
              <AccordionRegistered 
              key={user.username} 
              user={user} 
              onRemoveUser={handleOpenDialog} 
              allCourses={allCourses} 
              openSnackBar={openSnackBar}
              />
            </div>
          ))}   
          </div>
        </div>
      </div>
      <Footer/>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={toastMessage.current}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleRemoveUser} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div> 
    :
    <AuthDisplay authorizeStatus={authorizeStatus} />
    }
    </div>
  );
}

export default Admin;
