// client/src/App.js
import React from "react";
import { useEffect, useState } from "react";
import "./css/App.css";
import { ReactRoutes } from "./components/ReactRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [data, setData] = useState(null);

/*   useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ReactRoutes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
