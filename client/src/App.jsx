// client/src/App.js
import React from "react";
import { useEffect, useState } from "react";
import "./css/App.css";
import { ReactRoutes } from "./components/ReactRoutes";
import { BrowserRouter } from "react-router-dom";
import { SearchContext } from "./components/SearchContext";


function App() {
  const [searchTerm, setSearchTerm] = useState('');

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
