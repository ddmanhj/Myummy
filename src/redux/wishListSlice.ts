import { wishlistType } from "@/types/food";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dishID: [],
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
      getWishListAPI: (state: any, action: any) => {
        state.dishID = action.payload;
        },
      addDishToWishList: (state: any, action: any) => {
        state.dishID = [...state.dishID, action.payload];
      },
      deleteDishWishList: (state: any, action: any) => {
        state.dishID = state.dishID.filter((dish: wishlistType) => dish.id !== action.payload.id);
      },
      resetWishList: (state) => {
        state.dishID = initialState.dishID;
      }
    },
  });
  
  export const {
    getWishListAPI,
    addDishToWishList,
    deleteDishWishList,
    resetWishList
  } = wishListSlice.actions;
  
export default wishListSlice.reducer;
