import {Routes, Route} from "react-router-dom";
import {NotFound, Header, Main, Category, ProductPage, Footer} from './index';
import css from './app.module.css';
import 'antd/dist/reset.css';

export const App = () => {

    return (
        <div className={css.wrapper}>
            <Header/>
            <Routes>
                <Route path="" element={<Main/>}/>
                <Route path={"/categories/:type"} element={<Category/>}/>
                <Route path={"/good/:id"} element={<ProductPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
