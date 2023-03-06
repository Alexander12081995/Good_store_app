import {Link} from "react-router-dom";
import css from './notFound.module.css';

export const NotFound = () => {
    return (
        <div className={css.container}>
            <p className={css.text}>Страница на данный момент не существует.</p>
            <Link to="" className={css.back}>Вернуться на главную</Link>
        </div>
    )
}
