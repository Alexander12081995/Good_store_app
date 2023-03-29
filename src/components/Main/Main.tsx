import {Menu, GoodCategory, Loader} from '../index';
import {useSelector} from "react-redux";
import {actions as actionsPopularCategories} from '../../store/popularCategories/reducer';
import {useEffect} from "react";
import {LOAD_STATUSES} from "../../types";
import {getPopularCategories, getPopularCategoriesLoadStatus} from "../../store/popularCategories/selectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const Main = () => {

    const popularCategoriesLoadStatus = useSelector(getPopularCategoriesLoadStatus)
    const popularCategories = useSelector(getPopularCategories)
    const dispatch = useAppDispatch()



    useEffect(() => {
        dispatch(actionsPopularCategories.fetchPopularCategories())
    }, [])

    return (
        <div>
            <Menu/>
            <Loader isLoading={popularCategoriesLoadStatus === LOAD_STATUSES.LOADING}/>
            {popularCategories.map((category) => <GoodCategory key={category.category.id} id={category.category.id} type={category.category.type} label={category.category.label} items={category.items}/>)}
        </div>
    )
}
