import {Link} from "react-router-dom";
import headerLogo from '../../images/header_logo.png';
import {Button, Input} from 'antd';
import css from './header.module.css';

const {Search} = Input

export const Header = () => {
    return (
        <div className={css.container}>
            <Link to=''>
                <div className={css.logo}>
                    <img src={headerLogo} alt={'logo'} className={css.logoImg}/>
                </div>
            </Link>
            <Search placeholder="Введите название товара" className={css.search}/>
            <Button className={css.login}>Войти</Button>
            <Link to='/basket' className={css.basket}>Корзина</Link>
        </div>
    )
}
