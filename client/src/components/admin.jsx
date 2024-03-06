import React, { useContext } from 'react';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import AccordionRegistered from './AccordionRegistered';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { SearchContext } from './SearchContext';

function Admin() {

  const [allCourses, setAllCourses] = React.useState([]);

  // Fetch the list of all courses when the component mounts
React.useEffect(() => {
  fetch("http://localhost:3001/api/courses", {
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
      console.error('Failed to fetch courses');
      return;
    }
  })
  .then((data) => {
    setAllCourses(data.courses)
  });
}, []);

  const [users, setUsers] = React.useState([
    { name: 'Asher Contreras', courses: ['Math 1010', 'Web Development', 'Science 1020'] },
    { name: 'Sergio Castillo', courses: ['Machine Learning', 'Computer Networking', 'Systems Programming'] },
    { name: 'Anderson Bills', courses: ['Data Structures', 'Computer Architecture', 'Computer Vision']}
  ]);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [userToRemove, setUserToRemove] = React.useState(null);

  const {searchTerm, setSearchTerm} = useContext(SearchContext);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleRemoveUser = () => {
    setUsers(users.filter(user => user !== userToRemove));
    setToastMessage(`Removed student: ${userToRemove.name}`);
    setToastOpen(true);
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

  return (
    <div id='AdminPage' className='w-full'>
      <ResponsiveAppBar onSearch={setSearchTerm}/>

      <div id='registeredUsers' className='grid grid-cols-1 place-items-center'>
        <h1 className='underline font-bold py-2'>Registered Students</h1>
        <div id='studentSection' className='flex w-full justify-center'>
          <div id='studentAccordion' className='w-4/5 pb-4'>
          {filteredUsers.map((user, index) => (
            <AccordionRegistered key={user.name} user={user} onRemoveUser={handleOpenDialog} allCourses={allCourses} />
          ))}   
          </div>
        </div>
      </div>
      <Footer/>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={toastMessage}
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
  );
}

export default Admin;
