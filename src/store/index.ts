import {reducer as reducerCategories} from './categories/reducer';
import {reducer as reducerProducts} from './products/reducer';
import {reducer as reducerPopularCategories} from './popularCategories/reducer';
import {reducer as reducerGoodInCart} from "./cart/reducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({
    categories: reducerCategories,
    products: reducerProducts,
    popularCategories: reducerPopularCategories,
    goodInCart: reducerGoodInCart,
})

export const store = configureStore({reducer: reducer});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
