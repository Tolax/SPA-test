import { useEffect, useState } from "react";
import "../App.css";
import Filter from "./Filter";
import Recieps from "./Recieps";

function Sap({id,handleItemClick, getRandomNumber}) {
  const [fromCountry, setFromCountry] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [mealTypes, setMealTypes] = useState([]);
  const [coutriesTags, setCountriesTags] = useState([]);

  useEffect(() => {
    fetch(
      "https://dummyjson.com/recipes?limit=50&skip=0&select=name,mealType"
    )
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result.recipes) && result.recipes.length > 0 && result.recipes[0].mealType) {
          const mealTypesSet = new Set();
          result.recipes.forEach((recipe) => {
            recipe.mealType.forEach((type) => {
              mealTypesSet.add(type);
            });
          });
          const uniqueMealTypes = Array.from(mealTypesSet);
          setMealTypes(uniqueMealTypes);
          console.log(mealTypes);
        } else {
          console.error("Data does not contain mealType information.");
        }
      })
      .catch((error) => console.error("Error fetching mealType:", error));
      fetch(
        "https://dummyjson.com/recipes?limit=50&skip=0&select=name,cuisine"
      )
        .then((res) => res.json())
        .then((result) => {
          if (Array.isArray(result.recipes) && result.recipes.length > 0 && result.recipes[0].cuisine) {
            const cuisinesSet = new Set(result.recipes.map((recipe) => recipe.cuisine));
            const uniqueCuisines = Array.from(cuisinesSet);
            setCountriesTags(uniqueCuisines);
            console.log(coutriesTags);
          } else {
            console.error("Data does not contain cuisine information.");
          }
        })
        .catch((error) => console.error("Error fetching tags:", error));
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
            mealTypes={mealTypes}
            coutriesTags={coutriesTags}
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
