import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Recieps from "./components/Recieps";
import RandomRecipe from "./components/RandomRecipe";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sap from "./components/Sap";

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Sap/>} />
            <Route path="/random-recipe" element={<RandomRecipe />} />
          </Routes>
    </Router>
  );
}

export default App;
