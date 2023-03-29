import {getProducts} from '../../api';
import {LOAD_STATUSES, Good} from '../../types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const PRODUCTS_NAME = 'products';

const fetchProducts = createAsyncThunk(PRODUCTS_NAME, getProducts);

export interface State {
    products: Good[];
    loadStatus: string;
    total: number;
}

const initialState: State = {
    products: [],
    loadStatus: LOAD_STATUSES.UNKNOWN,
    total: 0,
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
            state.total = action.payload.total
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions, fetchProducts
}
