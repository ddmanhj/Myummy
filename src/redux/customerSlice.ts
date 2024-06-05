import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {
    id: "",
    customerName: "",
    urlImageAvatar: "",
    phone: "",
    email: "",
    role: "",
    address:"",
    province: "",
    district: "",
    ward: "",
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
      upDateCustomer: (state, action) => {
        state.customer.customerName = action.payload.customerName;
        state.customer.urlImageAvatar = action.payload.urlImageAvatar;
        state.customer.phone = action.payload.phone;
        state.customer.address = action.payload.address;
        state.customer.province = action.payload.province;
        state.customer.district = action.payload.district;
        state.customer.ward = action.payload.ward;
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
    upDateCustomer
  } = customerSlice.actions;

  export const getCustomer = (state: any) => state.customer.customer;
  
export default customerSlice.reducer;
