import {Button} from "antd";
import {Link} from "react-router-dom";
import css from './slider.module.css';
import {FC} from "react";


interface SliderProps {
    id: string;
    img: string;
    alt: string;
    title: string;
    btn: string;
}

export const Slider: FC<SliderProps> = ({id, img, alt, title, btn}) => {

    return (
        <div className={css.carousel}>
            <img src={img} alt={alt} className={css.img}/>
            <h1 className={css.title}>{title}</h1>
            <Button className={css.btn}><Link to={"/categories/books"}>{btn}</Link></Button>
        </div>

    )
}
