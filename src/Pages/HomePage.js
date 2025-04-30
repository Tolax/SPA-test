import "../App.css";

import Filter from "../components/Filter/Filter";
import Recipes from "../components/Recipes/Recipes";

function HomePage() {
  return (
    <div className="App">
      <div className="header-top">
        <header>
          <h1 className="header-text">Сборник рецептов из разных стран мира</h1>
        </header>
      </div>

      <div className="main-info">
        <Filter />
        <Recipes />
      </div>
    </div>
  );
}

export default HomePage;
