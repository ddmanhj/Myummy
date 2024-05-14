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
  language: {
    language: "vi"
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
      },
      changeLanguageCustomer: (state, action) => {
        state.language = action.payload;
      }
    },
  });

  export const languageState = (state: any) => state.customer.language;
  
  export const {
    getInfoCustomer,
    customerLogOut,
    changeLanguageCustomer
  } = customerSlice.actions;
  
export default customerSlice.reducer;
