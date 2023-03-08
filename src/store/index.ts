import {reducer as reducerCategories} from './categories/reducer';
import {reducer as reducerProducts} from './products/reducer';
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({
    categories: reducerCategories,
    products: reducerProducts
})

export const store = configureStore({reducer: reducer})

export type RootStore = ReturnType<typeof store.getState>
