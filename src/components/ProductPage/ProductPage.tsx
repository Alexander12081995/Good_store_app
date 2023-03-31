import {Good, LOAD_STATUSES} from '../../types';
import {Link, useParams} from "react-router-dom";
import {Image, Button, Breadcrumb} from 'antd';
import css from './productPage.module.css';
import {ShoppingCartOutlined, HomeOutlined, CheckOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {getCategories} from "../../store/categories/selectors";
import {getProductsLoadStatus} from "../../store/products/selector";
import {getProducts} from "../../api";
import {useEffect, useState} from "react";
import {actions as actionsCategories} from "../../store/categories/reducer";
import {actions as actionsProducts} from "../../store/products/reducer";
import {actions as actionsCart} from "../../store/cart/reducer";
import {Loader} from "../Common";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getCart} from "../../store/cart/selector";
import {useNavigate} from "react-router";

export const ProductPage = () => {

    const [product, setProduct] = useState<Good[]>([])
    const [done, setDone] = useState(false)

    const {id} = useParams();

    const navigate = useNavigate()
    const categories = useSelector(getCategories)
    const cart = useSelector(getCart)
    const loadStatusProducts = useSelector(getProductsLoadStatus)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(actionsCategories.fetchCategory())
        dispatch(actionsProducts.fetchProducts())
        dispatch(actionsCart.fetchGetCart())
        window.scrollTo(0, 0)
    }, [])


    const count = cart.find((item) => item.id === id)?.count ?? 0;


    const addGoodInCart = () => {
        dispatch(actionsCart.fetchAddGoodInCart({good: product[0], count: count + 1}))
        setDone(true)
    }

    const navigateToCart = () => {
        navigate('/cart')
    }

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
                        <Image src={product[0]?.img} alt={'img'} width={380} height={512}/>
                    </div>
                    <div className={css.descriptionCard}>
                        <h1 className={css.productTitle}>{product[0]?.label}</h1>
                        <p className={css.productPrice}>{product[0]?.price}</p>
                        {!done && <Button onClick={addGoodInCart} icon={<ShoppingCartOutlined/>} className={css.productBasket}>Положить
                            в корзину</Button>}
                        {done && <Button onClick={navigateToCart} icon={<CheckOutlined/>} className={css.inCart}>Уже в корзине</Button>}

                        <p className={css.productDescription}>Описане: {product[0]?.description}</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}
