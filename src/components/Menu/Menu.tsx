import {Link} from "react-router-dom";
import {Slider} from '../Common';
import css from './menu.module.css';
import {useSelector} from "react-redux";
import {getCategories} from "../../store/categories/selectors";
import {Carousel} from "antd";
import main1 from "../../images/main1.jpg";
import main2 from "../../images/main2.jpg";
import main3 from "../../images/main3.jpg";

const dataSlider = [
    {id: "1", img: main1, alt: "img", title: "Книги со скидкой 20%", btn: "Выбрать книги"},
    {id: "2", img: main2, alt: "img", title: "Самые весенние книги", btn: "Выбрать книги"},
    {id: "3", img: main3, alt: "img", title: "Топ-1000 книг со скидками до 40%", btn: "Выбрать книги"}
]

export const Menu = () => {

    const categories = useSelector(getCategories);

    return (
        <div className={css.container}>
            <ul className={css.list}>
                {categories.map((category) => (
                    <Link to={`/categories/${category.type}`} key={category.id} className={css.categories}>
                        <li className={css.category}>{category.label}</li>
                    </Link>
                ))}
            </ul>
            <div className={css.carouselBlock}>
                <Carousel autoplay>
                    {dataSlider.map((item) => <Slider key={item.id} id={item.id} img={item.img} alt={item.alt} title={item.title} btn={item.btn}/>)}
                </Carousel>
            </div>
        </div>
    )
}
