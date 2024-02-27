import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Courses from "./courses";

 export const ReactRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />}></Route>
      <Route path="/LogIn" exact element={<Login />}></Route>
      <Route path="/SignUp" exact element={<Signup />}></Route>
      <Route path="/courses" exact element={<Courses />}></Route>
    </Routes>
  );
 };
