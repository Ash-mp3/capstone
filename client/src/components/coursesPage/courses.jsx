import React, { useContext } from 'react';
import AccordionCom from './AccordionCom';
import ResponsiveAppBar from "../ResponsiveAppBar"
import "../../css/courses.css"
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { SearchContext } from '../SearchContext';

import handleStatus from '../../controllers/handleStatus';
import AuthDisplay from '../AuthDisplay'

function Courses() {
  const [courses, setCourses] = useState([])
  const [authorizeStatus, setAuthorizeStatus] = useState("loading...")
  const {searchTerm, setSearchTerm} = useContext(SearchContext);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  
  const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  //fetch courses
  useEffect(() => {
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
      setCourses(data.courses)
    }).catch((err) => {
      console.log(err)
    }) ;
  },[])


  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm} }>
    <div className="Courses">
    {
    authorizeStatus === 'authorized' ?
      <div>
        <ResponsiveAppBar onSearch={handleSearch}/>
        
      
        <div id="listOfAvailable">
          { 
          //if there are courses to render, render them. Otherwise, display "loading..."
            courses !== '' 
            ?
            //map courses
            filteredCourses.map((course, index) => {
              return(
                <div key={index}>
                  <AccordionCom
                    title = {course.title}
                    description = {course.description}
                    tuition_cost = {course.tuition_cost}
                    credit_hours = {course.credit_hours}
                    class_id = {course.class_id}
                    maximum_capacity = {course.maximum_capacity}
                    schedule = {course.schedule}
                  />
                </div>
              )
            })    
            : 
            <div>
              loading...
            </div>
          }
        </div>

        <Footer>
        </Footer>
      </div>
      :
      //if the user is not authorized, display the authorize status
      <AuthDisplay authorizeStatus={authorizeStatus} />
      }
    </div>
    </SearchContext.Provider>
  );
}
export default Courses;

