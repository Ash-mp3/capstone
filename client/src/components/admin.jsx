import * as React from 'react';
import '../css/courses.css'; 
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";


function Admin() {
    return (
        <div className='AdminPage'>
            <ResponsiveAppBar />

            <div>
            Hello
            </div>

            <Footer/>
        </div>
    )
}
export default Admin;