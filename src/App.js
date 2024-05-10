import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Recieps from "./components/Recieps";
import RandomRecipe from "./components/RandomRecipe";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sap from "./components/Sap";

function App() {
  const [id, setId] = useState(1);
  const handleItemClick = (id) => {
    setId(id);
    console.log(id);

  };

  const getRandomNumber = () =>{
    const num = Math.floor(Math.random() * 50) + 1;
    return num;
    console.log(num);
  }

  return (
    <Router>
          <Routes>
            <Route path="/" element={<Sap id={id} handleItemClick={handleItemClick} getRandomNumber={getRandomNumber}/>} />
            <Route path={`/random-recipe/${id}`} element={<RandomRecipe id={id}/>} />
          </Routes>
    </Router>
  );
}

export default App;
