import {Routes, Route} from "react-router-dom";
import {NotFound, Header, Main} from './index';
import css from './app.module.css';

export const App = () => {
    return (
        <div className={css.wrapper}>
            <Header/>
            <Routes>
                <Route path='' element={<Main/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    )
}
