import { useEffect, useState } from "react";
import "../App.css";
import Filter from "./Filter";
import Recieps from "./Recieps";

function Sap({id,handleItemClick, getRandomNumber}) {
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
      <div className="App">
        <div className="header-top">
          <header>
            <h1 className="header-text">Сборник рецептов из разных стран мира</h1>
          </header>
        </div>
        
        <div className="main-info">
          <Filter
            id={id}
            difficulty={difficulty}
            fromCountry={fromCountry}
            type={type}
            tags={tags}
            handleItemClick={handleItemClick}
            getRandomNumber={getRandomNumber}
            handleResetFilters={handleResetFilters}
            handleTypeChange={handleTypeChange}
            handleFromCountryChange={handleFromCountryChange}
            handleDifficultyChange={handleDifficultyChange}
          />
          <Recieps fromCountry={fromCountry} difficulty={difficulty} type={type} handleItemClick={handleItemClick}/>
        </div>
      </div>
  );
}

export default Sap;
