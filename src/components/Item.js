import React from 'react'
import blackstar from "../icons/blackstar.png";
import emptystar from "../icons/emptystar.png";
import timer from "../icons/icon.png";
import './item.css'

export default function Item({recieps}) {
  return (
    <>{recieps.map((item) => {
        return (
          <>
            <div className="item-reciept" key={item.id}>
              <div className="item-block-name"  key={item.id}>
                <h3>{item.name}</h3>
              </div>
              <img className="img-reciept" src={item.image} />
              <div className="instructions">{item.instructions}</div>
              <div className="timer">
                <img src={timer} />
                {item.cookTimeMinutes} минут
              </div>
              <div className="features">
                Сложность:
                {item.difficulty === "Easy" && (
                  <div>
                    <img src={blackstar} alt="Filled Star" />
                    <img src={emptystar} alt="Empty Star" />
                    <img src={emptystar} alt="Empty Star" />
                  </div>
                )}
                {item.difficulty === "Medium" && (
                  <div>
                    <img src={blackstar} alt="Filled Star" />
                    <img src={blackstar} alt="Filled Star" />
                    <img src={emptystar} alt="Empty Star" />
                  </div>
                )}
                {item.difficulty === "Hard" && (
                  <div>
                    <img src={blackstar} alt="Filled Star" />
                    <img src={blackstar} alt="Filled Star" />
                    <img src={blackstar} alt="Filled Star" />
                  </div>
                )}
              </div>
              <div className="features">Кухня: {item.cuisine}</div>
              <div className="features">{item.mealType}</div>
            </div>
          </>
        );
      })}</>
  )
}
