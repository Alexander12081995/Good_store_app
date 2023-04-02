import {Input, Button} from 'antd';
import css from "./login.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {actions, loginThunk} from "../../../store/login/reducer";
import {useNavigate} from "react-router";

export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({login: "", password: ""})

    const updateForm = (nextForm: Partial<typeof form>) => {
        setForm((prevForm) => ({...prevForm, ...nextForm}));
    };

    const loginHandler = (e: any) => {
        dispatch(loginThunk(form))
            .then(() => {
                navigate('/')
            }).catch(() => {
            console.log("show error tost")
        });
    }

    return (
        <div className={css.containerLogin}>
            <h1>Вход</h1>
            <div>
                <Input value={form.login} onChange={({target: {value: login}}) => updateForm({login})}
                       placeholder={'Login'}/>
                <Input value={form.password} onChange={({target: {value: password}}) => updateForm({password})}
                       placeholder={'Password'} type='password' className={css.inputPassword}/>
                <div className={css.groupBtn}>
                    <Button htmlType={"submit"} onClick={loginHandler}>Войти</Button>
                    <Link to={"/registration"}>
                        <Button>Зарегестрироваться</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
