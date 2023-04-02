import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addCart, getCart} from "../../api";
import {Good, GoodInCart, LOAD_STATUSES} from "../../types";



const SLICE_NAME = "cart";

const fetchGetCart = createAsyncThunk(`${SLICE_NAME}/fetchGetCart`, getCart)

const fetchAddGoodInCart = createAsyncThunk(`${SLICE_NAME}/addGoodInCart`,  async (body: {good?: Good, count?: number, id?: string}, thunkAPI) => {
        const response = await addCart(body)
    thunkAPI.dispatch(fetchGetCart())
        return response
    }
)

export interface State {
    goodInCart: GoodInCart[]
    commonCount: number
    loadStatus: LOAD_STATUSES
}

const initialState: State = {
    goodInCart: [],
    loadStatus: LOAD_STATUSES.UNKNOWN,
    commonCount: 0,
}

export const slice = createSlice({
    name: SLICE_NAME,
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
            state.commonCount = state.goodInCart.reduce((acc, obj) => acc + obj.count, 0)
            state.goodInCart = action.payload
        })

        builder.addCase(fetchAddGoodInCart.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchAddGoodInCart.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchAddGoodInCart.fulfilled, (state, action) => {
            console.log('payo', action.payload)
            state.goodInCart = action.payload

            state.loadStatus = LOAD_STATUSES.LOADED
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchGetCart,
    fetchAddGoodInCart
}
