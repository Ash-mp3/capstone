import * as React from 'react';
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

function Admin() {
  const [users, setUsers] = React.useState([
    { name: 'Asher Contreras', courses: ['Math 1010', 'Web Development', 'Science 1020'] },
    { name: 'Sergio Castillo', courses: ['Machine Learning', 'Computer Networking', 'Systems Programming'] },
    { name: 'Anderson Bills', courses: ['Data Structures', 'Computer Architecture', 'Computer Vision']}
  ]);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [userToRemove, setUserToRemove] = React.useState(null);

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
      <ResponsiveAppBar />

      <div id='registeredUsers' className='grid grid-cols-1 place-items-center'>
        <h1 className='underline font-bold py-2'>Registered Students</h1>
        <div id='studentSection' className='flex w-full justify-center'>
          <div id='studentAccordion' className='w-4/5 pb-4'>
          {users.map((user, index) => (
            <AccordionRegistered key={user.name} user={user} onRemoveUser={handleOpenDialog} />
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
