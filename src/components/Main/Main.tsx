import {Menu, GoodCategory} from '../index';
import {categories} from '../../api';

export const Main = () => {
return (
    <div>
        <Menu/>
        {categories.map((category) =>
            <GoodCategory key={category.id} id={category.id} type={category.type} label={category.label}/>)}
    </div>
)
}
