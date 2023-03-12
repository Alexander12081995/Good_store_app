import {GoodCategory} from '../index'
import {Link, useParams} from "react-router-dom";
import {Category as CategoryTypes, LOAD_STATUSES} from '../../types';
import css from './category.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {useEffect} from "react";
import {actions} from "../../store/categories/reducer";
import {Loader} from "../index";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";

export const Category = () => {

    const categories = useSelector(getCategories)
    const dispatch = useDispatch()
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)

    const fetchCategoriesStore = () => dispatch(actions.fetchCategory() as any)
    useEffect(() => {
        fetchCategoriesStore()
    }, [])

    const {type} = useParams()
    const category = categories.find((category: CategoryTypes) => category.type === type)
    {loadStatusCategories === LOAD_STATUSES.LOADED && console.log(categories)}


    return (
        <div>
            <Loader isLoading={loadStatusCategories === LOAD_STATUSES.LOADING}/>
            {loadStatusCategories === LOAD_STATUSES.LOADED &&
                <div>
                    <Breadcrumb className={css.breadcrumb}>
                        <Breadcrumb.Item>
                            <Link to="/">
                                <HomeOutlined />
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {category!.label}
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <GoodCategory type={category!.type} label={category!.label} id={category!.id}/>
                </div>
            }
        </div>
    )
}
