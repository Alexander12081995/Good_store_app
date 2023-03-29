import {useSelector} from "react-redux";
import {getCart} from "../../store/cart/selector";
import {useEffect} from "react";
import {actions} from "../../store/cart/reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";


export const Cart = () => {

    const goodInCart = useSelector(getCart)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.fetchGetCart())
    }, [])

    return (
        <div>

        </div>
    )
}
