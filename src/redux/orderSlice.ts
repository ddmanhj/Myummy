import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingInformation: {
    customerID: '',
    fullName: "",
    phone: '',
    email: '',
    address: '',
    dishes: [],
    province:'',
    district: '',
    ward: '',
    message: '',
  }
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
       saveBillingInformation: (state, action) => {
        state.billingInformation = action.payload;
       },
       completeBillingInformation: (state) => {
        state.billingInformation = initialState.billingInformation;
       }
    },
  });
  
  export const {
    saveBillingInformation,
    completeBillingInformation
  } = orderSlice.actions;

  export const getBillingInformation = (state: any) => state.order.billingInformation;
  
export default orderSlice.reducer;
