import categories from './categories.json';
import products from './products.json';

const get = <T>(mock: T): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(mock), 1_000));

export const getProducts = () => get(products);

export const getCategories = () => get(categories);
