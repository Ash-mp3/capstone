import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Courses from "./courses";
import Profile from "./Profile";
import Logout from "./Logout";
import Admin from "./admin";

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
