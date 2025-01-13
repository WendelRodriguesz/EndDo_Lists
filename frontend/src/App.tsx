import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListDetails from "./pages/ListDetails";
import Teste from "./pages/Teste/Teste";
import { ListProvider } from "./components/ListContext/ListContext";

const App: React.FC = () => {
  return (
    <Router>
      <ListProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists/:id" element={<ListDetails />} />
        <Route path="/teste" element={<Teste/>} />
      </Routes>
      </ListProvider>
    </Router>
  );
};

export default App;
