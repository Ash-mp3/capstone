import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

//controllers
import addClass from '../../controllers/addClass';
import removeClass from '../../controllers/removeClass';
import Courses from './courses';


export default function AccordionCom(props) {
  const { title, description, tuition_cost, credit_hours, class_id, spots_left, enrolledIn, enrolledCourses, updateEnrolledCourses } = props

  async function handleAddCourse(class_id){
    class_id = `${class_id}`
    const data = await addClass(class_id)
    if(data.ok){
      updateEnrolledCourses([...enrolledCourses, {class_id: class_id}])
    }
  }
  async function handleRemoveCourse(class_id){
    class_id = `${class_id}`
    const data = await removeClass(class_id)
    if(data.ok){
      updateEnrolledCourses(enrolledCourses.filter(enrolledCourse => enrolledCourse.class_id !== class_id))
    }
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {title}
        {enrolledIn?
        <div className="grow text-right">
          ENROLLED
        </div>
        :""}
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
        <Typography>Tuition Cost: ${tuition_cost}</Typography>
        <Typography>Credit Hours: {credit_hours}</Typography>
        <Typography>Spots Left: {spots_left}</Typography>
      </AccordionDetails>
      <AccordionActions>
        {
        !enrolledIn ?
          <Button id='addCourse' className='w-full' onClick={() => handleAddCourse(class_id)}>Add Course</Button>
        :
          <Button id='removeCourse' className='w-full' onClick={() => handleRemoveCourse(class_id)}>Remove Course</Button>
        }
      </AccordionActions>
    </Accordion>
  );
}
