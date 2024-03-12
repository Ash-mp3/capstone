import { Routes, Route } from "react-router-dom";
import Login from "./loginPage/Login";
import Signup from "./signUpPage/Signup";
import Courses from "./coursesPage/courses";
import Profile from "./profilePage/Profile";
import Logout from "./loginPage/Logout";
import Admin from "./adminPage/admin";

 export const ReactRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />}></Route>
      <Route path="/LogIn" exact element={<Login />}></Route>
      <Route path="/LogOut" exact element={<Logout />}></Route>
      <Route path="/SignUp" exact element={<Signup />}></Route>
      <Route path="/courses" exact element={<Courses />}></Route>
      <Route path="/Profile" exact element={<Profile/>}></Route>
      <Route path="/Admin" exact element={<Admin/>}></Route>
    </Routes>
  );
 };
