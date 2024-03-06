import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export default function AccordionRegistered({ user, onRemoveUser, allCourses }) {

  const [courses, setCourses] = React.useState(user.courses);
  const [selectedCourse, setSelectedCourse] = React.useState('');

  const handleAddCourse = () => {
    if (selectedCourse && !courses.includes(selectedCourse))
    {
      setCourses([...courses, selectedCourse]);
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    setCourses(courses.filter(course => course !== courseToRemove));
    // Add a toast notification here
  };

  const handleRemoveUserClick = (event) => {
    event.stopPropagation();
    onRemoveUser(user);
  };

  console.log(allCourses);

  return (
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    <Box display="flex" alignItems="center" width="100%">
      <Avatar>{user.name.charAt(0)}</Avatar>
      <Box flexGrow={1} ml={1}>
        {user.name}
      </Box>
      <Button onClick={handleRemoveUserClick} className='w-1/4 '>Remove Student</Button>
    </Box>
  </AccordionSummary>
  {courses.map((course, index) => (
    <AccordionDetails key={index}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <div>{course}</div>
        <Button onClick={() => handleRemoveCourse(course)} className='w-1/5'>Remove Course</Button>
      </Box>
    </AccordionDetails>
  ))}
  <AccordionActions>
          <Select
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
          className='w-full'
        >
          {allCourses.map((course) => (
            <MenuItem value={course.title} key={course.title}>{course.title}</MenuItem>
          ))}
        </Select>
        <Button onClick={handleAddCourse} className='w-1/5'>Add Course</Button>
      </AccordionActions>
    </Accordion>
  );
}
