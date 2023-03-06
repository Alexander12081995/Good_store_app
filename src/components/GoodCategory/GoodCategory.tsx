import {FC, useCallback, useEffect} from 'react';
import {Category} from '../../types';
import {Good} from '../../types';
import {Link} from "react-router-dom";
import {Card} from '../index';
import css from './good.module.css';
import products from '../../api/products.json';

export const GoodCategory: FC<Category> = ({type, label, id}) => {



    return (
        <div className={css.container}>
            <Link to={`/categories/${type}`} className={css.link}>
                <h3 className={css.title}>{label}</h3>
            </Link>
            <ul className={css.listCard}>
                {products
                    .filter((product: Good) => product.categoryTypeId === type)
                    .map((product) => (
                        <li key={product.id} >
                            <Card img={product.img}
                                  id={product.id}
                                  categoryTypeId={product.categoryTypeId}
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

