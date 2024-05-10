import React, { useEffect, useState } from "react";
import "./randomrecipe.css";



export default function RandomRecipe() {
    const [recipe, setRecipe] = useState({});
    const [random, setRandom] = useState(getRandomNumber());

    function getRandomNumber() {
        return Math.floor(Math.random() * 30) + 1;
      }
    
    useEffect(()=>{
        fetch(`https://dummyjson.com/recipes/${random}`)
        .then(res => res.json())
        .then(res=>setRecipe(res));
    },[])

  return (
    <div>
      <div className="header-single-recipe">
        <a>Наименование блюда длинное</a>
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
            <div>{recipe.prepTimeMinutes+recipe.cookTimeMinutes}</div>
          </div>
          <div className="cook-instructions">
            <div className="head-of-block">Инструкция приготовления</div>
          </div>
        </div>
        <div className="block-img">
          <img src={recipe.image} className="img-single-recipe" />
        </div>
      </div>
    </div>
  );
}
