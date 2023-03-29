import type {RootStore} from "../index";
import {State} from "./reducer";

export const getProducts = (store: RootStore): State["products"] => store.products.products

export const getProductsLoadStatus = (store: RootStore): State['loadStatus'] => store.products.loadStatus
