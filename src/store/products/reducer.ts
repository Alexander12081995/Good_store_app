import products from '../../api/products.json';
import {getProducts} from '../../api';
import {LOAD_STATUSES, Good} from '../../types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const PRODUCTS_NAME = 'products';

const fetchProducts = createAsyncThunk(PRODUCTS_NAME, getProducts);

export interface State {
    products: Good[];
    loadStatus: string
}

const initialState: State = {
    products: [],
    loadStatus: LOAD_STATUSES.UNKNOWN
}

export const slice = createSlice({
    name: PRODUCTS_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{items: Good[], total: number}>) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            state.products = action.payload.items
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions, fetchProducts
}
