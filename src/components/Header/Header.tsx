import {Link} from "react-router-dom";
import headerLogo from '../../images/header_logo.png';
import {Button, Input} from 'antd';
import css from './header.module.css';
import {useCallback, useEffect, useState} from "react";
import {actions} from "../../store/products/reducer";
import debounce from 'lodash/debounce';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getLogin} from "../../store/login/selector";
import {useSelector} from "react-redux";

const {Search} = Input

interface Params {
    text: string;
}

export const Header = () => {
    const [params, setParams] = useState({
        text: ""
    })
    const isAuth = useSelector(getLogin)
    const dispatch = useAppDispatch()
    const updateParams = (nextParams: Partial<Params>) => {
        setParams((prevParams) => ({...prevParams, ...nextParams}));
    };
    const fetchGetProductsDebounce = useCallback(debounce((params: Params): void =>
    dispatch(actions.fetchProducts(params) as any), 2_000), [dispatch])

    const handlerButton = () => {
        localStorage.setItem("userToken", "");
        window.location.reload()
    }

    useEffect(() => {
        fetchGetProductsDebounce(params)
    },[params])



    return (
        <div className={css.container}>
            <Link to=''>
                <div className={css.logo}>
                    <img src={headerLogo} alt={'logo'} className={css.logoImg}/>
                </div>
            </Link>
            <Search  onChange={(e) => updateParams({text: e.target.value})} placeholder="Введите название товара" className={css.search}/>
            {isAuth && <Button onClick={handlerButton} className={css.login}>Выйти</Button>}
            {!isAuth && <Link to={"/login"}>
                <Button className={css.login}>Войти</Button>
            </Link>}

            <Link to='/cart' className={css.basket}>Корзина</Link>
        </div>
    )
}
