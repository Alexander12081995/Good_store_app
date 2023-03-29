import {Category, Good, GoodInCart} from "../types";

// const get = <T>(mock: T): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(mock), 1_000));

const BASE_URL = "http://localhost:3000";


const get = (url: string, params: Record<string, string | number> = {}) => {

    const searchParams = new URLSearchParams({...params} as Record<string, string>)

    const fullUrl = new URL(url, BASE_URL)

    fullUrl.search = searchParams.toString()

    return fetch(fullUrl).then((data) => {
        if (data.ok) {
            return data.json()
        }
        throw new Error('oops')
    })
}


export const getProducts = (params?: { categoryTypeIds?: string, sortBy?: keyof Good, sortDirection?: string, minPrice?: number, maxPrice?: number, page?: number, text?: string, ids?: string, limit?: number, offset?: number }): Promise<{ items: Good[], total: number }> =>
    get("/api/goods", params);

export const getCategories = (): Promise<{ categories: Category[] }> =>
    get("/api/categories");

export const getPopularCategories = (): Promise<{ category: Category; items: Good[] }[]> =>
    get("/api/popular_categories")

export const getCart = (): Promise<GoodInCart[]> =>
    get("/api/cart")

let token = ""

const post = (url: string, body: Record<string, unknown>) => {
    fetch(new URL(url, BASE_URL), {method: "POST", body: JSON.stringify(body)})
        .then((data) => {
            if (data.status !== 200) throw Error(String(data.status))
            if (data.ok) {
                return data.json();
            }
        })
        .then((response) => {
            if (response) token = response.token
            localStorage.setItem("userToken", token)
            return response
        })
}
//@ts-ignore
export const login = (credentials: { login: string, password: string }): Promise<{ login: string; token: string }> => post("/api/login", credentials)

//@ts-ignore
window.login = login;


