// client/src/App.js
import React from "react";
import { useEffect, useState } from "react";
import "./css/App.css";
import { ReactRoutes } from "./components/ReactRoutes";
import { BrowserRouter } from "react-router-dom";
import { SearchContext } from "./components/SearchContext";


function App() {
  const [data, setData] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

/*   useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="App">
      <BrowserRouter>
        <ReactRoutes />
      </BrowserRouter>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
