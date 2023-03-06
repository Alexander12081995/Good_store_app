import {reducer} from './categories/reducer';
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({reducer: reducer})

export type RootStore = ReturnType<typeof store.getState>
