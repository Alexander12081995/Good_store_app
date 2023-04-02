import {getCategories} from '../../api';
import {Category, LOAD_STATUSES} from '../../types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const SLICE_NAME = 'category';

const fetchCategory = createAsyncThunk(`${SLICE_NAME}/fetchCategory`, getCategories);

export interface State {
    categories: Category[];
    loadStatus: LOAD_STATUSES;
}
const initialState: State = {
    categories: [],
    loadStatus: LOAD_STATUSES.UNKNOWN
}

const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(fetchCategory.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            state.categories = action.payload.categories
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    fetchCategory
}

