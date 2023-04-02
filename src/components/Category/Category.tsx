import {GoodCategory} from '../index'
import {Link, useParams} from "react-router-dom";
import {LOAD_STATUSES} from '../../types';
import css from './category.module.css';
import {useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {useEffect, useState} from "react";
import {actions as actionsCategories} from "../../store/categories/reducer";
import {Loader} from "../index";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {getProducts} from "../../api";
import {Good} from "../../types";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const Category = () => {

    const [products, setProducts] = useState<Good[]>([])
    const {type} = useParams()

    const categories = useSelector(getCategories)
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(actionsCategories.fetchCategory())
        window.scrollTo(0, 0)
    }, [])


    const category = categories.find((category) => category.type === type)


    useEffect(() => {
        if (category) {
            getProducts({categoryTypeIds: category?.id}).then((data) => setProducts(data.items))
        }
    }, [category])


    return (
        <div>
            <Loader isLoading={loadStatusCategories === LOAD_STATUSES.LOADING}/>
            {loadStatusCategories === LOAD_STATUSES.LOADED &&
                <div>
                    <Breadcrumb className={css.breadcrumb}>
                        <Breadcrumb.Item>
                            <Link to="/">
                                <HomeOutlined/>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {category!.label}
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <GoodCategory label={category!.label} type={category!.type} id={category!.id} items={products}/>
                </div>
            }
        </div>
    )
}
