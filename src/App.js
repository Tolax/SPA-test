import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sap from "./components/Sap";
import RandomRecipe from "./components/RandomRecipe";

function App() {
  const [id, setId] = useState(1);

  const handleItemClick = useCallback((id) => {
    setId(id);
    console.log(id);
  }, []);

  const getNextRecipeId = () => {
    setId((prevId) => prevId + 1);
  };

  const getPrevRecipeId = () => {
    setId((prevId) => prevId - 1);
  };

  const getRandomNumber = useCallback(() => {
    const num = Math.floor(Math.random() * 50) + 1;
    return num;
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Sap id={id} handleItemClick={handleItemClick} getRandomNumber={getRandomNumber} />}
        />
        <Route
          path="/random-recipe/:id"
          element={<RandomRecipe getNextRecipeId={getNextRecipeId} getPrevRecipeId={getPrevRecipeId}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
