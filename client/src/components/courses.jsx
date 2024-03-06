import React, { useContext } from 'react';
import AccordionCom from './AccordionCom';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { SearchContext } from './SearchContext';

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
    fetch("http://localhost:3001/api/courses", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    .then((res) => {
      //if the status is OK, set the authorizeStatus to authorized.
      //Otherwise, set the authorizeStatus to unauthorized
      if(res.status === 200){
        setAuthorizeStatus('authorized')
        return(res.json())
      } else {
        setAuthorizeStatus('unauthorized')
        return
      }
    })
    .then((data) => {
      setCourses(data.courses)
    });
  },[])

/*   if(courses !== ''){
    console.log(courses)
  }
 */
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
                  {AccordionCom(course.title, course.description)}
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
      <div>
        <h1>{authorizeStatus}</h1>
        {/* if user is unauthorized, give them an option to return to the login page */}
        {authorizeStatus === 'unauthorized' ? <a href='/login'>Go back to login</a> : ''}
      </div>
      }
    </div>
    </SearchContext.Provider>
  );
}
export default Courses;

