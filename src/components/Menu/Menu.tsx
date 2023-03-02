import {Link} from "react-router-dom";
import {Carousel, Button} from "antd";
import {categories} from '../../types';
import main1 from '../../images/main1.jpg';
import main2 from '../../images/main2.jpg';
import css from './menu.module.css';

export const Menu = () => {
    return (
        <div className={css.container}>
            <ul className={css.list}>
                {categories.map((category) => (
                    <Link to={`/${category.type}`} key={category.id} className={css.categories}>
                        <li style={{marginTop: 15}}>{category.label}</li>
                    </Link>
                ))}
            </ul>
            <div className={css.carousel_block}>
                <Carousel autoplay dots={false}>
                    <div className={css.carousel}>
                        <img src={main1} alt={'books'} className={css.img}/>
                        <h2 className={css.title}>Книги со скидкой 20%</h2>
                        <Button className={css.btn}><Link to={`/${categories[6].type}`}>Выбрать книги</Link></Button>
                    </div>
                    <div className={css.carousel}>
                        <img src={main2} alt={'books'} className={css.img}/>
                        <h2 className={css.title}>Книги со скидкой 20%</h2>
                        <Button className={css.btn}><Link to={`/${categories[6].type}`}>Выбрать книги</Link></Button>
                    </div>
                </Carousel>
            </div>

        </div>
    )
}
