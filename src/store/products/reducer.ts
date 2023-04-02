import {getProducts, postGoodInStoreApi} from '../../api';
import {LOAD_STATUSES, Good} from '../../types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const SLICE_NAME = 'products';

const fetchProducts = createAsyncThunk(`${SLICE_NAME}/fetchProducts`, getProducts);

const fetchPostGoodInStoreApi = createAsyncThunk(`${SLICE_NAME}/fetchPostGoodInStoreApi`, postGoodInStoreApi)

export interface State {
    products: Good[];
    loadStatus: LOAD_STATUSES;
    total: number;
    newGood: Omit<Good, 'id'>;
}

const initialState: State = {
    products: [],
    loadStatus: LOAD_STATUSES.UNKNOWN,
    newGood: {img: '', price: '', description: '', categoryTypeId: '', label: ''},
    total: 0,
}

export const slice = createSlice({
    name: SLICE_NAME,
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

        builder.addCase(fetchPostGoodInStoreApi.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchPostGoodInStoreApi.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchPostGoodInStoreApi.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            // state.newGood = action.payload
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchProducts,
    fetchPostGoodInStoreApi
}
