import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../api";

const SLICE_NAME = "user_login";

export const loginThunk = createAsyncThunk(`${SLICE_NAME}/loginThunk`, async (credentials: {login: string, password: string}) => {
    const response =  await login(credentials);
    localStorage.setItem("userToken", response.token)

    return response
})

export interface GoodsStore {
    isAuth: boolean
    userData: { login: string; token: string }
}

const initialState: GoodsStore = {
    isAuth: Boolean(localStorage.getItem("userToken")),
    userData: {login: '', token: ''}
}

const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.isAuth = true
            state.userData = action.payload
        })
    }
})

export const reducer = slice.reducer

export const actions = {
    ...slice.actions,
    loginThunk
}

