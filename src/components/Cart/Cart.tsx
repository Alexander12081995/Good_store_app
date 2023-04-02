import {useSelector} from "react-redux";
import {getCart, getCommonCount} from "../../store/cart/selector";
import {useEffect, useState} from "react";
import {actions as actionsCart} from "../../store/cart/reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {GoodInCart} from "../../types";
import css from "./cart.module.css";
import {Button, Image, Modal} from "antd";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {getLogin} from "../../store/login/selector";


export const Cart = () => {

    const [modal, contextHolder] = Modal.useModal();

    const countDown = () => {
        let secondsToGo = 8;

        const instance = modal.success({
            title: 'Поздравляем с покупкой',
            content: `В ближайшее время наш оператор свяжется с вами для уточнения необходимых данных для пробретения товаров ${secondsToGo}`,
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            instance.update({
                content: `В ближайшее время наш оператор свяжется с вами для уточнения необходимых данных для пробретения товаров ${secondsToGo} second.`,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
        }, secondsToGo * 1000);
    };


    const goodInCart: GoodInCart[] = useSelector(getCart)
    const navigate = useNavigate()
    const isAuth = useSelector(getLogin)
    const commonCount = useSelector(getCommonCount)
    const commonPrice = goodInCart.reduce((acc, obj) => acc + (obj.count * +obj.good.price), 0)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(actionsCart.fetchGetCart())
    }, [])



    const addGoodOne = (good: GoodInCart) => {
        dispatch(actionsCart.fetchAddGoodInCart({...good, count: good.count + 1}))
    }

    const deleteGoodOne = (good: GoodInCart) => {
        dispatch(actionsCart.fetchAddGoodInCart({...good, count: good.count - 1}))
    }


    return (
        <>
            {!isAuth ? navigate("/login") :
                <>
                    {commonCount === 0 && <span>В корзине пусто. Чтобы найти товары, используйте поиск или выберите товары из просмотренных ранее:</span>}
                    {commonCount > 0 && <div>
                        <p className={css.infoCart}>Общее колличество товаров в корзине: {commonCount}</p>
                        <p className={css.infoCart}>Общая сумма: {commonPrice}</p>
                        <ul>
                            {goodInCart.map((good) => (
                                <li key={good.id} className={css.cart}>
                                    <Image src={good.good.img} width={150} height={200}/>
                                    <Link to={`/good/${good.good.id}`}>
                                        <p>{good.good.label}</p>
                                    </Link>

                                    <p>{good.good.price}</p>
                                    <div className={css.groupCount}>
                                        <Button onClick={()=> addGoodOne(good)} shape={"circle"} icon={<PlusOutlined />}/>
                                        <p>{good.count}</p>
                                        <Button onClick={() => deleteGoodOne(good)} shape={"circle"} icon={<MinusOutlined />}/>
                                    </div>

                                    <p>{good.count*Number(good.good.price)}</p>
                                </li>
                            ))}
                        </ul>
                        <div className={css.buttonCoast}>
                            <Button className={css.btn} onClick={countDown}>Купить</Button>
                        </div>

                        {contextHolder}
                    </div>}
            </>}


        </>
    )
}
