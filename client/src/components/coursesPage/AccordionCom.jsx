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


export default function AccordionCom(props) {
  const { title, description, tuition_cost, credit_hours, class_id, spots_left } = props
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
          <Typography>Tuition Cost: ${tuition_cost}</Typography>
          <Typography>Credit Hours: {credit_hours}</Typography>
          <Typography>Spots Left: {spots_left}</Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button id='addCourse' onClick={() => addClass(class_id)}>Add Course</Button>
          <Button id='removeCourse'>Remove Course</Button>
        </AccordionActions>
      </Accordion>
  );
}
