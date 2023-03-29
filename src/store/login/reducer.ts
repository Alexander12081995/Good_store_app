import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../api";

const SLICE_NAME = "user";

const loginThunk = createAsyncThunk(SLICE_NAME, async (credentials: {login: string, password: string}) => {
    const response = await login(credentials);

    localStorage.setItem("userToken", response.token)

    return response
})

export interface GoodsStore {
    isAuth: boolean
}

const initialState: GoodsStore = {
    isAuth: Boolean(localStorage.getItem("userToken"))
}

const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.isAuth = true
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    loginThunk
}

