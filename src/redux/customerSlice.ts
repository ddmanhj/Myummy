import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {
    id: "",
    customerName: "",
    urlImageAvatar: "",
    phone: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  },
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
      getInfoCustomer: (state, action) => {
        state.customer = action.payload;
      },
      customerLogOut: (state) => {
        state.customer = initialState.customer;
      }
    },
  });
  
  export const {
    getInfoCustomer,
    customerLogOut
  } = customerSlice.actions;
  
export default customerSlice.reducer;
