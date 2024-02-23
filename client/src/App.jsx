// client/src/App.js

import React from "react";
import "./css/App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("../../server/server")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
