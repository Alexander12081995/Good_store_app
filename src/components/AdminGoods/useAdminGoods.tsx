import {Good} from "../../types";
import {useCallback, useEffect, useState} from "react";
import css from "./adminGoods.module.css";
import {useNavigate} from "react-router";
import {actions as actionsCategories} from "../../store/categories/reducer";
import {actions, actions as actionsProducts} from "../../store/products/reducer";
import {useSelector} from "react-redux";
import {getProducts, getProductsLoadStatus, getTotal} from "../../store/products/selector";
import {getCategories} from "../../store/categories/selectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import debounce from 'lodash/debounce';

export interface ParamsProps {
    limit: number;
    offset: number;
    text: string;
    categoryTypeIds: string;
    minPrice: number;
    maxPrice: number;
    sortBy: keyof Good;
    sortDirection: "asc" | "desc";
}

export const optionsSelectParams = [
    {value: "minPrice", label: "По возврастанию цены"},
    {value: "maxPrice", label: "По убыванию цены"},
    {value: "alphabet", label: "По алфавиту"},
]

export const useAdminGoods = () => {

    const products = useSelector(getProducts);
    const loadStatusProducts = useSelector(getProductsLoadStatus)
    const categories = useSelector(getCategories)
    const total = useSelector(getTotal);
    const dispatch = useAppDispatch();

    const dataSource = products.map((product) => ({...product, key: product.id}))
    const options = categories.map((category) => ({value: category.id, label: category.label}))
    const allCategories = [...options, {value: "12", label: "Все товары"}]

    const navigate = useNavigate()
    const handleRowClick = (record: { id: string }) => {
        navigate(`/good/${record.id}`)
    }

    const columns = [
        {
            title: "Продукт",
            dataIndex: "img",
            key: "img",
            render: (img: string) => <img src={img} alt='product' className={css.img}/>
        },
        {title: "Название продукта", dataIndex: "label", key: "label"},
        {title: "Цена", dataIndex: "price", key: "price"},
    ]

    const [params, setParams] = useState<ParamsProps>({
        limit: 20,
        offset: 0,
        text: "",
        categoryTypeIds: "1,2,3,4,5,6,7,8,9,10,11",
        minPrice: 0,
        maxPrice: 1000,
        sortBy: "price",
        sortDirection: "asc",
    })
    const onSearch = (value: string) => {
        setParams((prevParams) => ({...prevParams, text: value}))
    }

    const handleOnChangeSelect = (value: string) => {
        setParams((prevParams) => ({...prevParams, categoryTypeIds: value}))
        if (value === "12") {
            setParams((prevParams) => ({...prevParams, categoryTypeIds: "1,2,3,4,5,6,7,8,9,10,11"}))
        }
    }
    const handleOnChangeSlider = (values: any) => {
        setParams((prevParams) => ({...prevParams, minPrice: values[0], maxPrice: values[1]}))
    }
    const resetParams = () => {
        setParams({
            limit: 20,
            offset: 0,
            text: "",
            categoryTypeIds: "1,2,3,4,5,6,7,8,9,10,11",
            minPrice: 0,
            maxPrice: 1000,
            sortBy: "price",
            sortDirection: "asc",
        })
    }
    const handleOnChangeSelectParams = (value: string) => {
        if (value === "minPrice") {
            setParams((prevParams) => ({...prevParams, sortBy: "price", sortDirection: "asc"}))
        }
        if (value === "maxPrice") {
            setParams((prevParams) => ({...prevParams, sortBy: "price", sortDirection: "desc"}))
        }
        if (value === "alphabet") {
            setParams((prevParams) => ({...prevParams, sortBy: "label", sortDirection: "asc"}))
        }
        console.log(value)
    }

    const onChangeParamsDebounce = useCallback(debounce((params: ParamsProps): void =>
    dispatch(actionsProducts.fetchProducts(params) as any), 1_000), [dispatch])


    useEffect(() => {
        dispatch(actionsCategories.fetchCategory())
    }, [])

    useEffect(() => {
        onChangeParamsDebounce(params)
        // dispatch(actionsProducts.fetchProducts(params))
    }, [params])

    return {
        handleOnChangeSelectParams,
        handleOnChangeSelect,
        handleOnChangeSlider,
        handleRowClick,
        resetParams,
        setParams,
        onSearch,
        loadStatusProducts,
        allCategories,
        dataSource,
        columns,
        params,
        total,
    }
}
