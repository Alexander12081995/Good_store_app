import {RootStore} from "../index";
import {State} from "./reducer";


export const getCart = (store: RootStore): State["goodInCart"] => store.goodInCart.goodInCart

export const getCommonCount = (store: RootStore): State["commonCount"] => store.goodInCart.commonCount

export const getCartLoadStatus = (store: RootStore): State["loadStatus"] => store.goodInCart.loadStatus
