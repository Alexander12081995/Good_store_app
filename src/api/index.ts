import categories from './categories.json';
import products from './products.json';
import {Category, Good} from "../types";

// const get = <T>(mock: T): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(mock), 1_000));

const BASE_URL = "http://localhost:3000";


const get = (url: string) => {

    const fullUrl = new URL(url, BASE_URL)

    return fetch(fullUrl).then((data) => {
        if(data.ok) {
           return  data.json().then((r) => r.json())
        }
        throw new Error ('oops')
    })
}

export const getProducts = (): Promise<Good[]> => get("/api/goods");

export const getCategories = (): Promise<Category[]> => get("/api/categories");

