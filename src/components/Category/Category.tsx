import {GoodCategory} from '../index'
import {Link, useParams} from "react-router-dom";
import {Category as Cat, LOAD_STATUSES} from '../../types';
import css from './category.module.css';
// import categories from '../../api/categories.json';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {useCallback, useEffect} from "react";
import {actions} from "../../store/categories/reducer";
import {Loader} from "../index";

export const Category = () => {

    const categories = useSelector(getCategories)
    const dispatch = useDispatch()
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)

    const fetchCategoriesStore = useCallback(() => dispatch(actions.fetchCategory() as any), [dispatch])
    useEffect(() => {
        fetchCategoriesStore()
    })

    const {cat} = useParams()
    const category = categories.find((category: Cat) => category.type === cat)


    return (
        <div>
            <Loader isLoading={loadStatusCategories === LOAD_STATUSES.LOADING}/>
            {loadStatusCategories === LOAD_STATUSES.LOADED &&
                <div>
                    <Link to="/" className={css.link}>Вернуться на главную</Link>
                    <GoodCategory type={category!.type} label={category?.label}/>
                </div>
            }
        </div>
    )
}
