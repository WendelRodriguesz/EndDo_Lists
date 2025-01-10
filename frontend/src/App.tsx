import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListDetails from "./pages/ListDetails";
import Teste from "./pages/Teste/Teste";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists/:id" element={<ListDetails />} />

        <Route path="/teste" element={<Teste/>} />
      </Routes>
    </Router>
  );
};

export default App;
