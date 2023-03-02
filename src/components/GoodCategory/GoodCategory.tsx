import {FC} from 'react';
import {Category} from '../../types';
import {Good} from '../../types';
import {Link} from "react-router-dom";
import {products} from '../../api';
import {Card} from '../index';
import css from './good.module.css';

export const GoodCategory: FC<Category> = ({type, label, id}) => {
    return (
        <div className={css.container}>
            <Link to={`/${type}`} className={css.link}>
                <h3 className={css.title}>{label}</h3>
            </Link>
            <ul className={css.listCard}>
                {products
                    .filter((product: any) => product.categoryTypeId === type)
                    .map((product: any) => (
                        <li key={product.id} >
                            <Card img={product.img}
                                  label={product.label}
                                  description={product.description}
                                  price={product.price}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

