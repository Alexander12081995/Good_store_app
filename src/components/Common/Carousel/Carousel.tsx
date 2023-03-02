// import css from "../../Menu/menu.module.css";
import main1 from "../../../images/main1.jpg";
import {Button, Carousel} from "antd";
import {Link} from "react-router-dom";
import {categories} from "../../../api";
import main2 from "../../../images/main2.jpg";
import css from './carousel.module.css';

export const CarouselImg = () => {
    return(
        <div>
            <Carousel autoplay dots={false}>
                <div className={css.carousel}>
                    <img src={main1} alt={'books'} className={css.img}/>
                    <h2 className={css.title}>Книги со скидкой 20%</h2>
                    <Button className={css.btn}><Link to={`/${categories[6].type}`}>Выбрать книги</Link></Button>
                </div>
                <div className={css.carousel2}>
                    <img src={main2} alt={'books'} className={css.img2}/>
                    <h2 className={css.title2}>Предзаказ нового Iphone 15Pro Plus</h2>
                    <Button className={css.btn2}><Link to={`/${categories[6].type}`}>Заказать</Link></Button>
                </div>
            </Carousel>
        </div>
    )
}
