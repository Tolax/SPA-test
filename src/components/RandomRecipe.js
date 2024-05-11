import React, { useEffect, useState } from "react";
import "./randomrecipe.css";
import { useParams, useNavigate } from "react-router-dom";
import vector from "../icons/Vector.png";
import backIcon from '../icons/back.png'

export default function RandomRecipe({ getNextRecipeId, getPrevRecipeId }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  const goHome = () => {
    navigate(`/`);
  };

  useEffect(() => {
    console.log("Fetching recipe for id:", id);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Fetched recipe:", res);
        setRecipe(res);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  const handleNextClick = () => {
    console.log("Next recipe button clicked");
    getNextRecipeId();
    const newId = parseInt(id, 10) + 1;
    navigate(`/random-recipe/${newId}`);
  };

  const handlePrevClick = () => {
    console.log("Previous recipe button clicked");
    getPrevRecipeId();
    const newId = parseInt(id, 10) - 1;
    navigate(`/random-recipe/${newId}`);
  };

  return (
    <div>
      <div className="header-single-recipe">
        <a onClick={() => goHome()}><img src={backIcon}/></a>
        {recipe.name}
      </div>
      <div className="body-single-recipe">
        <div className="block-1">
          <div className="kitchen">
            <div className="head-of-block">Кухня</div>
            <div>{recipe.name}</div>
          </div>
          <div className="tags">
            <div className="head-of-block">Теги</div>
            <div>{recipe.tags}</div>
          </div>
          <div className="calorie">
            <div className="head-of-block">Калорийность</div>
            <div>{recipe.caloriesPerServing}</div>
          </div>
          <div className="portions">
            <div className="head-of-block">Количество порций</div>
            <div>{recipe.servings}</div>
          </div>
          <div className="description">
            <div className="head-of-block">Описание</div>
            <div>{recipe.instructions}</div>
          </div>
        </div>

        <div>
          <div className="time-to-cook">
            <div className="head-of-block">Общее время приготовления</div>
            <div>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}</div>
          </div>
          <div className="cook-instructions">
            <div className="head-of-block">Инструкция приготовления</div>
          </div>
        </div>

        <div className="block-img">
          <img src={recipe.image} className="img-single-recipe" alt="Recipe" />
          <div className="navigation-recipe-one">
            <div className="buttons-navigate-recipe">
              <button
                className="buttons-navigate-recipe-all"
                onClick={() => handlePrevClick()}>
                <img
                  className="buttons-navigate-recipe-prev-img"
                  src={vector}
                />
              </button>
              <button
                className="buttons-navigate-recipe-all"
                onClick={() => handleNextClick()}>
                <img
                  className="buttons-navigate-recipe-next-img"
                  src={vector}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
