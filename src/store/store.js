import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
    reducer: {
        filterState: filterReducer,
        cartState: cartReducer
    }
});