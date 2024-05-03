import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {
    id: "",
    customerName: "",
    urlImageAvatar: "",
    password: "",
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
      }
    },
  });
  
  export const {
    getInfoCustomer
  } = customerSlice.actions;
  
export default customerSlice.reducer;
