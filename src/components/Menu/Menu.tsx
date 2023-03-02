import {Link} from "react-router-dom";
import {CarouselImg} from '../Common';
import {categories} from '../../api';
import css from './menu.module.css';

export const Menu = () => {
    return (
        <div className={css.container}>
            <ul className={css.list}>
                {categories.map((category) => (
                    <Link to={`/${category.type}`} key={category.id} className={css.categories}>
                        <li className={css.category}>{category.label}</li>
                    </Link>
                ))}
            </ul>
            <div className={css.carouselBlock}>
                <CarouselImg/>
            </div>

        </div>
    )
}
