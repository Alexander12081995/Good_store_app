import {Menu, GoodCategory} from '../index';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {useEffect} from "react";
import {actions} from "../../store/categories/reducer";
import {LOAD_STATUSES} from "../../types";

export const Main = () => {

    const categories = useSelector(getCategories);
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)
    const dispatch = useDispatch()

    const fetchCategoriesStore = () => dispatch(actions.fetchCategory() as any)
    useEffect(() => {fetchCategoriesStore()}, [])

return (
    <div>
        <Menu/>

        {loadStatusCategories === LOAD_STATUSES.LOADED && <div>{
            categories.map((category) =>
                <GoodCategory key={category.id} id={category.id} type={category.type} label={category.label}/>)
        }</div>}


    </div>
)
}
