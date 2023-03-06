import {GoodCategory} from '../index'
import {Link, useParams} from "react-router-dom";
import {Category as Cat} from '../../types';
import css from './category.module.css';
// import categories from '../../api/categories.json';
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/categories/selectors";

export const Category = () => {

    const categories = useSelector(getCategories)

    const {cat} = useParams()
    const category = categories.find((category: Cat) => category.type === cat)

    console.log(category)

    return (
        <div>
            <Link to="/" className={css.link}>Вернуться на главную</Link>
            <GoodCategory type={category!.type} label={category?.label}/>
        </div>
    )
}
