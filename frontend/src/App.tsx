import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetails from "./pages/ListDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists/:id" element={<ListDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
