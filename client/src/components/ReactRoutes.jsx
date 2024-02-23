import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Courses from "./courses";//why no work? Works now when changed to lowercase

export const ReactRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact Component={Login}></Route>
      <Route path="/LogIn" exact Component={Login}></Route>
      <Route path="/SignUp" exact Component={Signup}></Route>
      <Route path="/courses" exact Component={Courses}></Route>
    </Routes>
  );
};
