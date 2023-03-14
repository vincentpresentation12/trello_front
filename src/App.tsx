import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/pages/Home";
import TaskDetails from "./component/pages/[id]";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>
  );
}

export default App;
