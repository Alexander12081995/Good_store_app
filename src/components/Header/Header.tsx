import {Link} from "react-router-dom";
import headerLogo from '../../images/header_logo.png';
import {Button, AutoComplete} from 'antd';
import css from './header.module.css';
import {useCallback, useEffect, useState} from "react";
import debounce from 'lodash/debounce';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getLogin} from "../../store/login/selector";
import {useSelector} from "react-redux";
import {getCommonCount} from "../../store/cart/selector";
import {Good} from "../../types";
import {useNavigate} from "react-router";
import {getProducts} from "../../api";


interface Params {
    text: string;
}

export const Header = () => {
    const [params, setParams] = useState<Params>({ text: "" });
    const [products, setProducts] = useState<Good[]>([])

    const isAuth = useSelector(getLogin);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const commonCount = useSelector(getCommonCount);

    const updateParams = (value: string) => {
        setParams((prevParams) => ({ ...prevParams, text: value }));
    };
    // const fetchGetProductsDebounce = useCallback(debounce((params: Params): void =>
    //     dispatch(actions.fetchProducts(params) as any).then((data: { total: number, items: Good[] }) => setProducts(data.items)), 2_000), []);


    const fetchGetProductsDebounce = useCallback(debounce((params) => getProducts(params).then(data => setProducts(data.items)), 1500), [])

    const handlerButton = () => {
        localStorage.setItem("userToken", "");
        window.location.reload()
    };

    useEffect(() => {
        fetchGetProductsDebounce(params)
    }, [params]);


    return (
        <div className={css.container}>
            <Link to=''>
                <div className={css.logo}>
                    <img src={headerLogo} alt={'logo'} className={css.logoImg}/>
                </div>
            </Link>
            <AutoComplete
                className={css.search}
                placeholder="Введите название товара"
                allowClear={true}
                options={(products || []).map((product) => ({
                    key: product.id,
                    value: product.label,
                    label: product.label
                }))}
                filterOption={true}
                onSelect={(_, {key}) => navigate(`/good/${key}`)}
                onChange={updateParams}
            />
            {isAuth && <Button onClick={handlerButton} className={css.login}>Выйти</Button>}
            {!isAuth && <Link to={"/login"}>
                <Button className={css.login}>Войти</Button>
            </Link>}

            <Link to='/cart' className={css.basket}>Корзина</Link>
            {commonCount >= 1 && <span className={css.commonCount}>{commonCount}</span>}
        </div>
    )
}
