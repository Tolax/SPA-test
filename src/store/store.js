import React from 'react';
import {configureStore} from '@reduxjs/toolkit'
import recipesSlice from './itemsSlice';
import filterSlice from './filterSlice';

const store = configureStore({
  reducer: {
    recipes: recipesSlice,
    filters: filterSlice,
  }
});

export default store;
