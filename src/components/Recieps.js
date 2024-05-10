import React, { useEffect, useState } from "react";
import "./recieps.css";
import Item from "./Item";
import vector from "../icons/Vector.png";
import blackstar from "../icons/blackstar.png";
import emptystar from "../icons/emptystar.png";
import timer from "../icons/icon.png";
import { useNavigate } from 'react-router-dom';

export default function Body({ fromCountry, difficulty, type, handleItemClick }) {
  const [total, setTotal] = useState(0);
  const [recieps, setRecieps] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reciepsPerPage] = useState(6);

  const nextPage = (e) => {
    e.preventDefault();
    const lastRecipeIndex = currentPage * reciepsPerPage;
    if (lastRecipeIndex < total) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const filter = async () => {
    if (recieps.length === 0) {
      return;
    }

    const filtered = recieps.filter((recipe) => {
      const filteredArr =
        recipe.difficulty.includes(difficulty) &&
        recipe.cuisine.includes(fromCountry);
        const tags = type !== "" ? recipe.tags.includes(type) : true;

      return filteredArr && tags;
    });
    setTotal(filtered.length);
    setCurrentPage(1);
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    filter();
  }, [fromCountry, difficulty, type]);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://dummyjson.com/recipes?limit=50&skip=0&select=name,image,instructions,difficulty,mealType,cuisine,cookTimeMinutes,prepTimeMinutes,tags"
    )
      .then((res) => res.json())
      .then((result) => {
        setRecieps(result.recipes);
        setFilteredRecipes(result.recipes);
        setTotal(result.total);
      });
    fetch("https://dummyjson.com/recipes/1")
      .then((res) => res.json())
      .then((res) => console.log(res.tags));
  }, []);

  const currentRecipe = filteredRecipes.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

  

  const handleClick = (id) => {
    console.log(`Нажат рецепт с id: ${id}`);
    // Здесь вы можете выполнить дополнительные действия с этим id
  };

  const navigate = useNavigate();

  const handleRandomRecipeClick = (id) => {
    navigate(`/random-recipe/${id}`);
  };

  const itmRecipes = currentRecipe.map((item) => (
    <div onClick={() => {handleItemClick(item.id); handleRandomRecipeClick(item.id)}} className="item-reciept" key={item.id}>
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
      <div className="features">{item.mealType}</div>
    </div>
  ));

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes.length / reciepsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div className="recieps-all">
      <div className="block-2">
        <div className="founded">
          <div className="text-founded">Найденные рецепты</div>
          <div className="number-of-recieps">{total}</div>
        </div>
      </div>
      <div className="cards">
        {itmRecipes}
        {/* <Item recieps={recieps} /> */}
      </div>
      <div className="pagination">
        <nav>
          <ul className="pagination-nav">
            <li>
              <a
                onClick={(e) => prevPage(e)}
                disabled={currentPage === 1}
                href="#"
                className="item-of-pagination">
                <img className="l-vector" src={vector} />
                <span className=""></span>
              </a>
            </li>
            {pageNumbers.map((number, id) => (
              <li>
                <a
                  key={id}
                  className={
                    currentPage === id + 1 ? "active" : "item-of-pagination"
                  }
                  onClick={(e) => paginate(e, number)}
                  href="#">
                  {number}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={(e) => nextPage(e)}
                disabled={
                  (currentPage - 1) * reciepsPerPage + filteredRecipes.length >=
                  total
                }
                href="#"
                className="item-of-pagination">
                <img className="r-vector" src={vector} />
                <span className="sr-only"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
