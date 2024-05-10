import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Recieps from "./components/Recieps";
import RandomRecipe from "./components/RandomRecipe";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [fromCountry, setFromCountry] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/tags")
      .then((res) => res.json())
      .then(result => setTags(result))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  const handleResetFilters = () => {
    setFromCountry("");
    setDifficulty("");
    setType("");
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFromCountryChange = (event) => {
    setFromCountry(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <div className="header-top">
          <header>
            <h1 className="header-text">Сборник рецептов из разных стран мира</h1>
          </header>
        </div>
        
        <div className="main-info">
          <Filter
            difficulty={difficulty}
            fromCountry={fromCountry}
            type={type}
            tags={tags}
            handleResetFilters={handleResetFilters}
            handleTypeChange={handleTypeChange}
            handleFromCountryChange={handleFromCountryChange}
            handleDifficultyChange={handleDifficultyChange}
          />
          <Routes>
            <Route path="/" element={<Recieps fromCountry={fromCountry} difficulty={difficulty} type={type} />} />
            <Route path="/random-recipe" element={<RandomRecipe />} />
          </Routes>
          {/* <Link to="/random-recipe">Случайный рецепт</Link> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
