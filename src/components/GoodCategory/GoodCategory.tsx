import {FC} from 'react';
import {Category} from '../../types';
import {Good} from '../../types';
import {Link} from "react-router-dom";
import {Card} from '../Card';
import css from './good.module.css';

interface CategoryProps {
    type: string;
    id: string;
    label: string;
    items: Good[];
}

export const GoodCategory: FC<CategoryProps> = ({type, id, label, items}) => {

    return (
        <div className={css.container}>
                <Link to={`/categories/${type}`} className={css.link}>
                    <h3 className={css.title}>{label}</h3>
                </Link>
                <ul className={css.listCard}>
                    {items.map((product) => (
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

