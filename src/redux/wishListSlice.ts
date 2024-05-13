import { wishlistType } from "@/types/food";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dishesID: [],
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
      getWishListAPI: (state: any, action: any) => {
        state.dishesID = action.payload;
        },
      addDishToWishList: (state: any, action: any) => {
        state.dishesID = [...state.dishesID, action.payload];
      },
      deleteDishWishList: (state: any, action: any) => {
        state.dishesID = state.dishesID.filter((dish: wishlistType) => dish.id !== action.payload.id);
      },
      resetWishList: (state) => {
        state.dishesID = initialState.dishesID;
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
