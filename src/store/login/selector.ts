import {GoodsStore} from "./reducer";
import {RootStore} from "../index";

export const getLogin = (store: RootStore): GoodsStore["isAuth"] => store.login.isAuth
