import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishList: {
        customerID: "",
        dishesID: [],
    }
};

const customerSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
      addDishesWishList: (state, action) => {
        state.wishList = action.payload;
      },
      deleteAllWishList: (state) => {
        state.wishList = initialState.wishList;
      }
    },
  });
  
  export const {
    addDishesWishList,
    deleteAllWishList
  } = customerSlice.actions;
  
export default customerSlice.reducer;
