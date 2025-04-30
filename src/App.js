import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RandomRecipe from "./components/RandomRecipe/RandomRecipe";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import HomePage from "./Pages/HomePage";
import RecipePage from "./Pages/RecipePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
