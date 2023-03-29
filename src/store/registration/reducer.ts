import {registration} from "../../api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOAD_STATUSES} from "../../types";


const SLICE_NAME = "user_registration"

export const registrationThunk = createAsyncThunk(SLICE_NAME, registration)

export interface State {
    loadStatus: string;
    token: string;
}

const initialState: State = {
    token: "",
    loadStatus: LOAD_STATUSES.UNKNOWN
}


const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registrationThunk.pending, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADING
        })
        builder.addCase(registrationThunk.rejected, (state, action) => {
            state.loadStatus = LOAD_STATUSES.ERROR
        })
        builder.addCase(registrationThunk.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED
            console.log(action.payload)
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    registrationThunk
}
