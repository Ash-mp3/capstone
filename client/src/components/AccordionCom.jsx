import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionCom() {
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Introduction to Computer Science
        </AccordionSummary>
        <AccordionDetails>
        "This course will introduce students to the fundamental concepts behind computers and computer programming. Topics covered include basic programming logic, algorithm development, computer architecture, and software engineering."
        </AccordionDetails>
        <AccordionActions>
          <Button id='addCourse'>Add Course</Button>
          <Button id='removeCourse'>Remove Course</Button>
        </AccordionActions>
      </Accordion>
  );
}