import type {RootStore} from '../index';

export const getCategories = (store: RootStore) => store.categories.categories

export const getCategoriesLoadStatus = (store: RootStore) => store.categories.loadStatus
