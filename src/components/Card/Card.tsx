import {FC} from 'react';
import {Good} from '../../types';
import css from './card.module.css';
import {Link} from "react-router-dom";

export const Card: FC<Good> =
    ({price, id, label, categoryTypeId, img, description}) => {


    return (
            <div className={css.cardWrapper}>
                <Link to={`/good/${id}`}>
                    <img src={img} alt={'img'} className={css.img}/>
                    <h3 className={css.title}>{label}</h3>
                    <p className={css.description}>{description}</p>
                    <p className={css.price}>{price}</p>
                </Link>
            </div>
        )
    }
