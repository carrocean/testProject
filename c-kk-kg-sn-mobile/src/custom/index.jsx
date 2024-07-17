import React from "react";
import ReactDom from "react-dom";
import Route from "./route";

const App = () => {
  return (
    <div>
      <Route />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("container"));
