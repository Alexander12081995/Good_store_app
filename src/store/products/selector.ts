import type {RootStore} from "../index";

export const getProducts = (store: RootStore) => store.products.products

export const getProductsLoadStatus = (store: RootStore) => store.products.loadStatus
