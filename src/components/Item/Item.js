import React from "react";
import blackstar from "../../icons/blackstar.png";
import emptystar from "../../icons/emptystar.png";
import timer from "../../icons/icon.png";
import "./item.css";
import { useNavigate } from "react-router-dom";

export default function Item({ currentRecipe }) {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      {currentRecipe.map((item) => (
        <div
          onClick={() => {
            handleItemClick(item.id);
          }}
          className="item-reciept"
          key={item.id}
        >
          <div className="item-block-name">
            <h3>{item.name}</h3>
          </div>
          <img className="img-reciept" src={item.image} alt={item.name} />
          <div className="instructions">{item.instructions}</div>
          <div className="timer">
            <img src={timer} alt="Timer Icon" />
            {item.cookTimeMinutes + item.prepTimeMinutes} минут
          </div>
          <div className="features">
            Сложность:{" "}
            {item.difficulty === "Easy" && (
              <>
                <img src={blackstar} alt="Filled Star" />
                <img src={emptystar} alt="Empty Star" />
                <img src={emptystar} alt="Empty Star" />
              </>
            )}
            {item.difficulty === "Medium" && (
              <>
                <img src={blackstar} alt="Filled Star" />
                <img src={blackstar} alt="Filled Star" />
                <img src={emptystar} alt="Empty Star" />
              </>
            )}
            {item.difficulty === "Hard" && (
              <>
                <img src={blackstar} alt="Filled Star" />
                <img src={blackstar} alt="Filled Star" />
                <img src={blackstar} alt="Filled Star" />
              </>
            )}
          </div>
          <div className="features">Кухня: {item.cuisine}</div>
          <div className="features-block">
            {item.mealType &&
              item.mealType.map((tag, index) => (
                <div key={index}>
                  {tag}
                  {index !== item.mealType.length - 1 && ","}
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
