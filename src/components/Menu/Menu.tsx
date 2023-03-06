import {Link} from "react-router-dom";
import {CarouselImg} from '../Common';
import css from './menu.module.css';
import categories from '../../api/categories.json';

export const Menu = () => {



    return (
        <div className={css.container}>
            <ul className={css.list}>
                {categories.map((category) => (
                    <Link to={`/categories/${category.type}`} key={category.id} className={css.categories}>
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
