import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCart} from "../../api";
import {GoodInCart, LOAD_STATUSES} from "../../types";


const CART_NAME = "cart";

const fetchGetCart = createAsyncThunk(CART_NAME, getCart)

export interface State {
    goodInCart: GoodInCart[]
    loadStatus: string
}

const initialState: State = {
    goodInCart: [],
    loadStatus: LOAD_STATUSES.UNKNOWN
}

export const slice = createSlice({
    name: CART_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetCart.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchGetCart.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchGetCart.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            state.goodInCart = action.payload
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchGetCart
}
