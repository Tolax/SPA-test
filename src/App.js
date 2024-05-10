import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Recieps from "./components/Recieps";
import RandomRecipe from "./components/RandomRecipe";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sap from "./components/Sap";

function App() {
  const [id, setId] = useState(3);
  const handleItemClick = (id) => {
    setId(id);
    console.log(id);

  };

  return (
    <Router>
          <Routes>
            <Route path="/" element={<Sap id={id} handleItemClick={handleItemClick}/>} />
            <Route path={`/random-recipe/${id}`} element={<RandomRecipe id={id}/>} />
          </Routes>
    </Router>
  );
}

export default App;
