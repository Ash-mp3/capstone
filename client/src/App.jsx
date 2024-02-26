// client/src/App.js

// client/src/App.js

import React from "react";
import ReactDOMServer from "react-dom/server";
import "./css/App.css";
import Login from "./components/Login.jsx"

function App() {
  const [data, setData] = React.useState(null);

  const [Component, setComponent] = React.useState((null));

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      const component = data.content; // Dynamic import
      setComponent(() => component);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
    {console.log(component)}

      <header className="App-header">
        <>{!data ? "Loading..." : <Component />}</>
      </header>
    </div>
  );
}

export default App;
