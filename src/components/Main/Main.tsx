import {Menu, GoodCategory, Loader} from '../index';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {useCallback, useEffect} from "react";
import {actions} from "../../store/categories/reducer";
import {LOAD_STATUSES} from "../../types";

export const Main = () => {

    const categories = useSelector(getCategories);
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)
    const dispatch = useDispatch()

    const fetchCategoriesStore = useCallback(() => dispatch(actions.fetchCategory() as any), [dispatch])
    useEffect(() => {fetchCategoriesStore()}, [])

return (
    <div>
        <Menu/>

        {loadStatusCategories === LOAD_STATUSES.LOADED && <div>{
            categories.map((category) =>
                <GoodCategory key={category.id} type={category.type} label={category.label}/>)
        }</div>}


    </div>
)
}
