import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish(state: any, action: any) {
      //payload giúp có thêm item mới
      state.cart.push(action.payload);
    },
    deleteDish(state: any, action: any) {
      //payload delete theo Id
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },
    //Cập nhật giỏ hàng khi người dùng thêm pizza
    increaseDIshQuantity(state: any, action: any) {
      const item = state.cart.find((item: any) => item.id === action.payload);
      item.quantityCart++;
      item.totalPrice = item.quantityCart * item.unitPrice;
    },
    //Cập nhật giỏ hàng khi người dùng giảm pizza
    decreaseDishQuantity(state: any, action: any) {
      //khi người dùng xóa xuống còn 0 pizza
      const item = state.cart.find((item: any) => item.id === action.payload);

      item.quantityCart--;
      item.totalPrice = item.quantityCart * item.unitPrice;

      if (item.quantityCart === 0) cartSlice.caseReducers.deleteDish(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addDish,
  deleteDish,
  increaseDIshQuantity,
  decreaseDishQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: any) => state.cart.cart;

export const checkIsInCart = (dish: any) => (state: any) => {
  return (
    state.cart.cart?.find((wishlistDish: any) => wishlistDish?.id == dish?.id) != null
  );
};

export const getCurrentQuantityById = (id: any) => (state: any) =>
  state.cart.cart.find((item: any) => item.id === id)?.quantityCart ?? 0;
