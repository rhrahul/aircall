import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

const App = () => {
  return (
    <div className="container bg-slate-50">
      <Header />
      <div className="container-view bg-primary px-10 text-white">
        Some activities should be here
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
