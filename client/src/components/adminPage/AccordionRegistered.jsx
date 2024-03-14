import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import EditUser from './EditUser';

export default function AccordionRegistered({ user, onRemoveUser, allCourses, onEditUser }) {

  const [courses, setCourses] = React.useState(user.courses);
  const [selectedCourse, setSelectedCourse] = React.useState('');

  const handleAddCourse = () => {
    let selectedCourseId
    allCourses.forEach(course => {
      if(course.title.toUpperCase() === selectedCourse.toUpperCase()){
        selectedCourseId = course.class_id
      }
    });
    if(selectedCourseId !== undefined){
      fetch("/api/admin/addEnrollment", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({user_id: user.user_id, class_id: selectedCourseId})
      })
      .then(res => {
        if(res.ok){
          setCourses([...courses, {title: selectedCourse, class_id: selectedCourseId}]);
        }
        return(res.json())
      })
      .then(data => {
        console.log(data)

      })
    } else {
      console.log("not a valid class")
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    fetch("/api/admin/removeEnrollment", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({user_id: user.user_id, class_id: courseToRemove.class_id})
    })
    .then(res => {
      if(res.ok){
        setCourses(courses.filter(course => course !== courseToRemove));
        // Add a toast notification here
      }
      return(res.json())
    })
    .then(data => {
      console.log(data)
    })

  };

  const handleRemoveUserClick = (event) => {
    event.stopPropagation();
    onRemoveUser(user);
  };

  return (
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    <Box display="flex" alignItems="center" width="100%">
      <Avatar>{user.username.charAt(0)}</Avatar>
      <Box flexGrow={1} ml={1}>
        {user.username}
      </Box>
      <Button onClick={handleRemoveUserClick} className='w-1/4 '>Remove Student</Button>
    </Box>
  </AccordionSummary>
  {courses.map((course, index) => (
    <AccordionDetails key={index}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <div>{course.title}</div>
        <Button onClick={() => handleRemoveCourse(course)} className='w-1/5'>Remove Course</Button>
      </Box>
    </AccordionDetails>
  ))}
  <AccordionActions>
          <Autocomplete
            options={allCourses}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Courses" />}
            onChange={(event, newValue) => {
              setSelectedCourse(newValue?.title || '');
            }}
            className='w-full'
        />
        <Button onClick={handleAddCourse} className='w-1/5'>Add Course</Button>
        <EditUser user={user} onEditUser={onEditUser} />
      </AccordionActions>
    </Accordion>
  );
}
