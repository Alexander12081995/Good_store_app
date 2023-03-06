import {getCategories} from '../../api';
import {Category, LOAD_STATUSES} from '../../types';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const CATEGORIES_NAME = 'category';

const fetchCategory = createAsyncThunk(CATEGORIES_NAME, getCategories);

export interface State {
    categories: Category[];
    loadStatus: string;
}
const initialState: State = {
    categories: [{id: "", type: "", label: ""}],
    loadStatus: LOAD_STATUSES.UNKNOWN
}

const slice = createSlice({
    name: CATEGORIES_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            state.categories = action.payload
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchCategory
}

