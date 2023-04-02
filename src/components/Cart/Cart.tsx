import {useSelector} from "react-redux";
import {getCart, getCommonCount} from "../../store/cart/selector";
import {useEffect} from "react";
import {actions as actionsCart} from "../../store/cart/reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {GoodInCart} from "../../types";
import css from "./cart.module.css";
import {Button, Image} from "antd";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


export const Cart = () => {

    const goodInCart: GoodInCart[] = useSelector(getCart)
    // const commonCount = useSelector(getCommonCount)
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
        <div>
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
        </div>
    )
}
