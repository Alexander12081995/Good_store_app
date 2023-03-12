import type {RootStore} from '../index';
import {State} from "./reducer";

export const getCategories = (store: RootStore): State['categories'] => store.categories.categories

export const getCategoriesLoadStatus = (store: RootStore): State['loadStatus'] => store.categories.loadStatus
