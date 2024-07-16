import React, { useEffect, useState } from "react";
import vector from "../../icons/Vector.png";
import "./recieps.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCuisines, fetchMealTypes, fetchRecipes } from "../../store/itemsSlice"
import Item from "../Item/Item";

export default function Recipes() {
  const [total, setTotal] = useState(50);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reciepsPerPage] = useState(6);
  const { fromCountry, type, difficulty } = useSelector(state => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchMealTypes());
    dispatch(fetchCuisines());
  }, []);

  const recipes = useSelector(state => state.recipes.items);
  
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
    if (recipes.length === 0) {
      return;
    }
  
    const filtered = recipes.filter((recipe) => {
      const filteredArr =
        recipe.difficulty.includes(difficulty) &&
        recipe.cuisine.includes(fromCountry) &&
        (type === "" || recipe.mealType.includes(type));
  
      return filteredArr;
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
    setFilteredRecipes(recipes);
    setLoading(false);
  }, [recipes]);

  const currentRecipe = filteredRecipes.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );


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
          <div className="number-of-recieps">{filteredRecipes.length}</div>
        </div>
      </div>
      <div className="cards">
        {!loading ? <Item currentRecipe={currentRecipe} /> : 'loading'}
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
