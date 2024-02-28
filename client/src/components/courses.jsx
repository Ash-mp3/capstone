import * as React from 'react';
import AccordionCom from './AccordionCom';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

//This is for user course page


function Courses() {

  return (
    <div className="Courses">

      <ResponsiveAppBar>
      </ResponsiveAppBar>
      
      <div id="listOfAvailable">
        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>

        <AccordionCom>
        </AccordionCom>
      </div>

      <Footer>
      </Footer>

    </div>

  );
}
export default Courses;

/// Stuff i need to get working once database is in -- set logout features, account and profile pages.