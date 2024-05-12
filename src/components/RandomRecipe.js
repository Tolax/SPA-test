import React, { useEffect, useState } from "react";
import "./randomrecipe.css";
import { useParams, useNavigate } from "react-router-dom";
import vector from "../icons/Vector.png";
import backIcon from "../icons/back.png";
import circle_start from "../icons/timeline_start.png";
import circle_full from "../icons/timeline_full.png";
import circle_end from "../icons/timeline_end.png";

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
      <div className="recipe-header">
        <div className="name-of-recipe">
          <a className="link-recipe-single" onClick={() => goHome()}>
            <img src={backIcon} />
          </a>
          <div>{recipe.name}</div>
        </div>
      </div>
      <div className="body-single-recipe">
        <div className="block-1">
          <div className="kitchen">
            <div className="head-of-block">Кухня</div>
            <div className="body-of-block-kitchen">{recipe.cuisine}</div>
          </div>
          <div className="tags">
            <div className="head-of-block">Теги</div>
            <div className="tags-body">
              {recipe.tags &&
                recipe.tags.map((tag, index) => (
                  <div className="tag-solo" key={index}>
                    #{tag}
                  </div>
                ))}
            </div>
          </div>
          <div className="calorie">
            <div className="head-of-block">Калорийность</div>
            <div className="calories">{recipe.caloriesPerServing}</div>
            <div className="calorie-hundred">100 грамм</div>
          </div>
          <div className="portions">
            <div className="head-of-block">Количество порций</div>
            <div className="servings">{recipe.servings}</div>
          </div>
          <div className="description">
            <div className="head-of-block">Описание</div>
            <div className="description-instructions">
              {recipe.instructions}
            </div>
          </div>
        </div>

        <div>
          <div className="time-to-cook">
            <div className="head-of-block">Общее время приготовления</div>
            <div className="timing">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} минут
            </div>
          </div>
          <div className="cook-instructions">
            <div className="head-of-block">Инструкция приготовления</div>
            <div className="instruction-steps">
              {recipe.instructions &&
                recipe.instructions.map((tag, index) => (
                  <div className="single-step" key={index}>
                    <div>
                      <img
                        src={
                          index === 0
                            ? circle_start
                            : index === recipe.instructions.length - 1
                            ? circle_end
                            : circle_full
                        }
                      />
                    </div>
                    {tag}
                  </div>
                ))}
            </div>
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
