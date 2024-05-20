import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    priceRange: [0, 85000],
    rating: "",
    search: ""
};

const filterDishSlice = createSlice({
    name: 'filterDish',
    initialState,
    reducers: {
        updateCategory: (state, action) => {
          state.categories = action.payload;
        },
        updatePriceRange: (state, action) => {
          state.priceRange = action.payload;
        },
        updateRating: (state, action) => {
          state.rating = action.payload;
        },
        updateSearch: (state, action) => {
          state.search = action.payload;
        },
        resetFilter: (state) => {
          Object.assign(state, initialState);
        }
    }
  });

  export const categoryFilter = (state: any) => state.filterDish.categories;
  export const priceRangeFilter = (state: any) => state.filterDish.priceRange;
  export const ratingFilter = (state: any) => state.filterDish.rating;
  export const searchFilter = (state: any) => state.filterDish.search;
  
  
  export const {
    updateCategory,
    updatePriceRange,
    updateRating,
    updateSearch,
    resetFilter,
  } = filterDishSlice.actions;
  
export default filterDishSlice.reducer;
