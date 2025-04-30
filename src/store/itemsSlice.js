import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      const response = await axios.get("https://dummyjson.com/recipes", {
        params: {
          limit: 0,
          skip: 0,
          select:
            "name,image,instructions,difficulty,mealType,cuisine,cookTimeMinutes,prepTimeMinutes,tags",
        },
      });
      return response.data.recipes;
    } catch (error) {
      throw new Error("Failed to fetch recipes");
    }
  }
);

export const fetchCuisines = createAsyncThunk(
  "recipes/fetchCuisines",
  async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes?limit=50&skip=0&select=name,cuisine"
      );
      const data = await response.json();

      if (
        Array.isArray(data.recipes) &&
        data.recipes.length > 0 &&
        data.recipes[0].cuisine
      ) {
        const cuisinesSet = new Set(
          data.recipes.map((recipe) => recipe.cuisine)
        );
        const uniqueCuisines = Array.from(cuisinesSet);
        return uniqueCuisines;
      } else {
        console.error("Data does not contain cuisine information.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      throw new Error("Failed to fetch cuisines");
    }
  }
);

export const fetchMealTypes = createAsyncThunk(
  "recipes/fetchMealTypes",
  async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes?limit=50&skip=0&select=name,mealType"
      );
      const data = await response.json();

      if (
        Array.isArray(data.recipes) &&
        data.recipes.length > 0 &&
        data.recipes[0].mealType
      ) {
        const mealTypesSet = new Set();
        data.recipes.forEach((recipe) => {
          recipe.mealType.forEach((type) => {
            mealTypesSet.add(type);
          });
        });
        const uniqueMealTypes = Array.from(mealTypesSet);
        return uniqueMealTypes;
      } else {
        console.error("Data does not contain mealType information.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching mealType:", error);
      throw new Error("Failed to fetch meal types");
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    mealTypes: [],
    cuisines: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "resolved";
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchMealTypes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMealTypes.fulfilled, (state, action) => {
        state.status = "resolved";
        state.mealTypes = action.payload;
      })
      .addCase(fetchMealTypes.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchCuisines.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCuisines.fulfilled, (state, action) => {
        state.status = "resolved";
        state.cuisines = action.payload;
      })
      .addCase(fetchCuisines.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

// export const { increment, setId, getNextRecipeId, getPrevRecipeId, getRandomRecipeId } = recipesSlice.actions;
export default recipesSlice.reducer;
