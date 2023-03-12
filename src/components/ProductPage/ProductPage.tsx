import {Category, Good, LOAD_STATUSES} from '../../types';
import {Link, useParams} from "react-router-dom";
import {Image, Button, Breadcrumb} from 'antd';
import css from './productPage.module.css';
import {ShoppingCartOutlined, HomeOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoriesLoadStatus} from "../../store/categories/selectors";
import {getProducts, getProductsLoadStatus} from "../../store/products/selector";
import {useEffect} from "react";
import {actions as actionsProducts} from "../../store/products/reducer";
import {actions as actionsCategories} from "../../store/categories/reducer";
import {Loader} from "../Common";

export const ProductPage = () => {

    const categories = useSelector(getCategories)
    const products = useSelector(getProducts)
    const loadStatusProducts = useSelector(getProductsLoadStatus)
    const loadStatusCategories = useSelector(getCategoriesLoadStatus)
    const dispatch = useDispatch()

    const fetchProductStore = () => dispatch(actionsProducts.fetchProducts() as any)
    const fetchCategoriesStore = () => dispatch(actionsCategories.fetchCategory() as any)

    useEffect(() => {
        fetchCategoriesStore();
        fetchProductStore()
    }, [])

    const {id} = useParams()
    const product = products.find((product: Good) => product.id === id)
    const category = categories.find((category: Category) => category?.type === product?.categoryTypeId)
    {loadStatusCategories === LOAD_STATUSES.LOADED && console.log(category)}


    return (
        <div>
            {loadStatusCategories === LOAD_STATUSES.LOADED && <Breadcrumb className={css.breadcrumb}>
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={`/categories/${category?.type}`}>{category?.label}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {product?.label}
                </Breadcrumb.Item>
            </Breadcrumb>}

            <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING}/>
            {loadStatusProducts === LOAD_STATUSES.LOADED && <div>
                <div className={css.containerCard}>
                    <div className={css.cardImg}>
                        <Image src={product!.img} alt={'img'}/>
                    </div>
                    <div className={css.descriptionCard}>
                        <h1 className={css.productTitle}>{product?.label}</h1>
                        <p className={css.productPrice}>{product?.price}</p>
                        <Button icon={<ShoppingCartOutlined/>} className={css.productBasket}>Положить в корзину</Button>
                        <p className={css.productDescription}>Описане: {product?.description}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}
