import {Menu, GoodCategory} from '../index';
import {categories} from '../../types';

export const Main = () => {
return (
    <div>
        <Menu/>
        {categories.map((category) =>
            <GoodCategory id={category.id} type={category.type} label={category.label}/>)}
    </div>
)
}
