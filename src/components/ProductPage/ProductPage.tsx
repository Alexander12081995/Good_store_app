import {Good, LOAD_STATUSES} from '../../types';
import {Link, useParams} from "react-router-dom";
import {Image, Button, Breadcrumb} from 'antd';
import css from './productPage.module.css';
import {ShoppingCartOutlined, HomeOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {getCategories} from "../../store/categories/selectors";
import {getProductsLoadStatus} from "../../store/products/selector";
import {getProducts} from "../../api";
import {useEffect, useState} from "react";
import {actions as actionsCategories} from "../../store/categories/reducer";
import {actions as actionsProducts} from "../../store/products/reducer";
import {Loader} from "../Common";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const ProductPage = () => {

    const [product, setProduct] = useState<Good[]>([])

    const {id} = useParams();

    const categories = useSelector(getCategories)
    const loadStatusProducts = useSelector(getProductsLoadStatus)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(actionsCategories.fetchCategory())
        dispatch(actionsProducts.fetchProducts())
        window.scrollTo(0, 0)
    }, [])


    // const product = products.find((product) => product.id === id)
    const category = categories.find((category) => category.id === product[0]?.categoryTypeId)

    useEffect(() => {
        if (id) {
            getProducts({ids: id}).then((data) => setProduct(data.items))
        }
    }, [])


    return (
        <div>
            <Breadcrumb className={css.breadcrumb}>
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={`/categories/${category?.type}`}>{category?.label}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {product[0]?.label}
                </Breadcrumb.Item>
            </Breadcrumb>

            <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING}/>
            {loadStatusProducts === LOAD_STATUSES.LOADED && <div>
                <div className={css.containerCard}>

                    <div className={css.cardImg}>
                        <Image src={product[0]?.img} alt={'img'} className={css.img}/>
                    </div>
                    <div className={css.descriptionCard}>
                        <h1 className={css.productTitle}>{product[0]?.label}</h1>
                        <p className={css.productPrice}>{product[0]?.price}</p>
                        <Button icon={<ShoppingCartOutlined/>} className={css.productBasket}>Положить в корзину</Button>
                        <p className={css.productDescription}>Описане: {product[0]?.description}</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}
