import {Input, Button} from 'antd';
import css from "./login.module.css";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div className={css.containerLogin}>
            <h1>Вход</h1>
            <div>
              <Input placeholder={'Login'}/>
              <Input placeholder={'Password'} type='password' className={css.inputPassword}/>
                <div className={css.groupBtn}>
                    <Button>Войти</Button>
                    <Link to={"/registration"}>
                        <Button>Зарегестрироваться</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
