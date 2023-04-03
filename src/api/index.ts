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


const post = (url: string, body: Record<string, unknown>) => {
    return fetch(new URL(url, BASE_URL), {method: "POST", body: JSON.stringify(body)})
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
            throw new Error("oops")
        })
}

export const login = (credentials: { login: string, password: string }): Promise<{ login: string; token: string }> => post("/api/login", credentials)

export const registration = (body: any): any => post("/api/registration", body)

const putCart = (url: string, body: Record<string, unknown>) => {
    return fetch(new URL(url, BASE_URL), {
        method: "PUT",
        body: JSON.stringify(body),
        // headers: {"Content-Type": "application/json"}
    })
        .then((data) => {
            if(data.ok) {
                return data.json()
            }
            throw new Error('oops')
        })
}


export const addCart = (body: {good?: Good, count?: number, id?: string}): Promise<GoodInCart[]> => putCart("/api/cart", body)


const postGood = (url: string, body: Omit<Good, 'id'>) => {
    return fetch(new URL(url, BASE_URL), {
        method: "POST",
        body: JSON.stringify(body)
    })

        .then((data) => {
            if (data.ok) {
                return data.json()
            }
            throw new Error('oops')
        })
}

export const postGoodInStoreApi = (body: Omit<Good, "id">): Promise<Good> => postGood("/api/goods", body)

const deleteGood = (url: string, productId: string) => {
    return fetch(new URL(url, BASE_URL), {
        method: "DELETE",
        body: JSON.stringify(productId)
    })
        .then((data) => {
            console.log("data", data)
            if (data.ok) {
                return data.json()
            }
            throw new Error("oops")
        })
}

export const deleteGoodFromStore = (id: string): Promise<Response> => {
   return  fetch(`http://localhost:3000/api/goods/${id}`, {method: "DELETE"})
}

