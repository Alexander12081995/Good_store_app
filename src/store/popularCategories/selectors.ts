import {RootStore} from "../index";
import {State} from "./reducer";


export const getPopularCategories = (store: RootStore): State["popularCategories"] => store.popularCategories.popularCategories

export const getPopularCategoriesLoadStatus = (store: RootStore): State["loadStatus"] => store.popularCategories.loadStatus
