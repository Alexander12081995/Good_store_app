import {Link} from "react-router-dom";
import header_logo from '../../images/header_logo.jpg';
import {Button, Input} from 'antd';
import css from './header.module.css';

const {Search} = Input

export const Header = () => {
    return (
        <div className={css.container}>
            <Link to=''>
                <div className={css.logo}>
                    <img src={header_logo} alt={'logo'} style={{width: '100%', height: '100%'}}/>
                </div>
            </Link>
            <Search placeholder="Введите название товара" className={css.search}/>
            <Button className={css.login}>Войти</Button>
            <Link to='/basket' className={css.basket}>Корзина</Link>
        </div>
    )
}
