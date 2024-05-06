import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerSlice from "./customerSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  customer: customerSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// const rootReducer = combineReducers({
//   customer: customerSlice,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });



export let persistor = persistStore(store);