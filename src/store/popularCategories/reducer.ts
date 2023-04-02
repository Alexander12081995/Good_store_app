import {Category, Good, LOAD_STATUSES} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPopularCategories} from "../../api";


const POPULAR_CATEGORIES_NAME = "popularCategories";

const fetchPopularCategories = createAsyncThunk(POPULAR_CATEGORIES_NAME, getPopularCategories)

export interface State {
    popularCategories: {category: Category, items: Good[]}[];
    loadStatus: string;
}

export const initialState: State = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    popularCategories: [{category: {id: "", label: "", type: ""}, items: []}]
}

export const slice = createSlice({
    name: POPULAR_CATEGORIES_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularCategories.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchPopularCategories.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchPopularCategories.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            state.popularCategories = action.payload
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchPopularCategories
}
