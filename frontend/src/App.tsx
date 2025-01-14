import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListDetails from "./pages/InfoLists/InfoLists";
// import Teste from "./pages/Teste/Teste";
import { ListProvider } from "./utils/contexts/ListContext/ListContext";

const App: React.FC = () => {
  return (
    <Router>
      <ListProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists/:id" element={<ListDetails />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </ListProvider>
    </Router>
  );
};

export default App;
