import {FC, useEffect} from 'react';
import {Category} from '../../types';
import {Good} from '../../types';
import {Link} from "react-router-dom";
import {Card} from '../Card';
import css from './good.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/products/selector";
import {actions} from "../../store/products/reducer";

export const GoodCategory: FC<Category> = ({type, label, id}) => {

    const products = useSelector(getProducts)
    const dispatch = useDispatch()

    const fetchProductsStore = () => dispatch(actions.fetchProducts() as any)
    useEffect(() => {fetchProductsStore()}, [])

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

