export interface Category {
    id: string;
    type: string;
    label: string;
}

export interface Good {
    categoryTypeId: string;
    description: string;
    id: string;
    img: string;
    label: string;
    price: string;
}

export enum LOAD_STATUSES {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    UNKNOWN = "UNKNOWN"
}
