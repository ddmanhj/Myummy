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
  }
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
      },
    },
  });
 

  export const customerState = (state: any) => state.customer.customer;
  
  export const {
    getInfoCustomer,
    customerLogOut,
  } = customerSlice.actions;

  export const getCustomer = (state: any) => state.customer.customer;
  
export default customerSlice.reducer;
