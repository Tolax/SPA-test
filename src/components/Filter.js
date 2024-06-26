import React from "react";
import "./filter.css";
import { useNavigate } from "react-router-dom";

export default function Filter({
  difficulty,
  fromCountry,
  type,
  mealTypes,
  coutriesTags,
  handleItemClick,
  getRandomNumber,
  handleResetFilters,
  handleTypeChange,
  handleFromCountryChange,
  handleDifficultyChange,
}) {
  const allMealTypes = mealTypes.map((item) => <option className="option" value={item}>{item}</option>);
  const allCountries = coutriesTags.map((item) => <option className="option" value={item}>{item}</option>);
  const navigate = useNavigate();

  const handleRandomRecipeClick = () => {
    const randomId = getRandomNumber();
    handleItemClick(randomId);
    navigate(`/random-recipe/${randomId}`);
  };

  return (
    <div className="info">
      <div className="img-block">
        <img
          className="img-setting"
          src="https://www.kirov.kp.ru/share/i/12/10603861/"></img>
        <div className="text-information">
          <div className="text-margin">
          В нашей жизни, когда время становится все более ценным ресурсом,
          задача планирования приема пищи становится все более сложной.
          </div>
          <div className="text-margin">
          Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или
          ужин? Каким образом мы можем легко и быстро определиться с выбором
          блюда и не тратить много времени на принятие этого решения?
          </div>
         <div>
         Наш сервис поможет: выбирайте параметры - и вперед!
         </div>
        </div>
      </div>
      <div className="filter-area">
        <div className="filter-1">
          <div className="text-filter">Кухня:</div>
          <select
            className="select-setting"
            value={fromCountry}
            onChange={handleFromCountryChange}>
            <option value="">Все страны и регионы</option>
            {allCountries}
          </select>
        </div>
        <div className="filter-2">
          <div className="text-filter">Тип блюда:</div>
          <select
            className="select-setting"
            value={type}
            onChange={handleTypeChange}>
            <option value="">Все типы</option>
            {allMealTypes}
          </select>
        </div>
        <div className="filter-3">
          <div className="text-filter-3">Сложность приготовления:</div>
          <div className="radio-buttons">
            <input
              type="radio"
              className={`btn-check radio-button-custom ${
                difficulty === "" ? "active-radio" : ""
              }`}
              name="difficulty"
              id="any"
              value=""
              checked={difficulty === ""}
              onChange={handleDifficultyChange}
            />
            <label
              className={`btn radio-button-custom ${
                difficulty === "" ? "active-radio" : ""
              }`}
              htmlFor="any">
              Любая
            </label>
            <input
              type="radio"
              className={`btn-check radio-button-custom ${
                difficulty === "Easy" ? "active-radio" : ""
              }`}
              name="difficulty"
              id="Easy"
              value="Easy"
              checked={difficulty === "Easy"}
              onChange={handleDifficultyChange}
            />
            <label
              className={`btn radio-button-custom ${
                difficulty === "Easy" ? "active-radio" : ""
              }`}
              htmlFor="Easy">
              Низкая
            </label>
            <input
              type="radio"
              className={`btn-check radio-button-custom ${
                difficulty === "Medium" ? "active-radio" : ""
              }`}
              name="difficulty"
              id="Medium"
              value="Medium"
              checked={difficulty === "Medium"}
              onChange={handleDifficultyChange}
            />
            <label
              className={`btn radio-button-custom ${
                difficulty === "Medium" ? "active-radio" : ""
              }`}
              htmlFor="Medium">
              Средняя
            </label>
            <input
              type="radio"
              className={`btn-check radio-button-custom ${
                difficulty === "High" ? "active-radio" : ""
              }`}
              name="difficulty"
              id="High"
              value="High"
              checked={difficulty === "High"}
              onChange={handleDifficultyChange}
            />
            <label
              className={`btn radio-button-custom ${
                difficulty === "High" ? "active-radio" : ""
              }`}
              htmlFor="High">
              Высокая
            </label>
          </div>
        </div>
        <button className="btn-reset" onClick={() => handleResetFilters()}>
          Сбросить все фильтры
        </button>
      </div>
      <div className="random-reciept">
        <div className="text-bottom">А еще можно попробовать на вкус удачу</div>
        <button onClick={handleRandomRecipeClick} className="btn-lucky">
          Мне повезет!
        </button>
      </div>
    </div>
  );
}
