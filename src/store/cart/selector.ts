import {RootStore} from "../index";
import {State} from "./reducer";


export const getCart = (store: RootStore): State["goodInCart"] => store.goodInCart.goodInCart

export const getCartLoadStatus = (store: RootStore): State["loadStatus"] => store.goodInCart.loadStatus
