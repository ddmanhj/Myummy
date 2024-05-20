import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerSlice from "./customerSlice";
import wishListSlice from "./wishListSlice";
import cartSlice from './cartSlice';
import filterDishSlice from "./filterDishSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  customer: customerSlice,
  wishList: wishListSlice,
  cart: cartSlice,
  filterDish: filterDishSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});



// const rootReducer = combineReducers({
//   customer: customerSlice,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });



export let persistor = persistStore(store);