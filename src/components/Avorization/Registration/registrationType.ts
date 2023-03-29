import * as yup from "yup";

const validationsShema = yup.object().shape({
    firstName: yup.string().typeError("Должна быть строкой").required("Обязательное поле").test("len", "Должно быть более 2-х символов", val => val.toString().length > 2),
    surname: yup.string().typeError("Должна быть строкой").test("len", "Должно быть более 2-х символов", (val) => {
        if (val) return val.toString().length > 2
    }),
    email: yup.string().email("Введите валидный Email").required("Обязательное поле"),
    password: yup.string().required("Обязательное поле").test("len", "Должно быть не менее 6 символов", (val) => {
        if (val) return val.toString().length >= 6
    }),
    confirmPassword: yup.string().required("Обязательное поле").oneOf([yup.ref("password")], "Пароли не совпадают").test("len", "Должно быть не менее 6 символов", (val) => {
        if (val) return val.toString().length >= 6
    }),
    categories: yup.array().test("minSelected", "Выберите минимум 2 значения", (value) => {
            return value && value.filter((val) => val).length >= 2;
        }),
    birthDate: yup.date().min(new Date("1930-01-01"), "Дата не может быть ранее 01-01-1930 года"),
    answer: yup.string().required("Введите ответ на секретный вопрос")
})

type InitialValuesDataType = {
    firstName: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
    secretQuestion: string,
    answer: string,
    categories: string[],
    gender: 1 | 2,
    isSubscribe: boolean,
    birthDate: string,
}

type FieldDataType = {
    name: 'firstName' | 'surname' | 'email' | 'password' | 'confirmPassword' | 'answer' | 'secretQuestion',
    label: string,
    type: 'text' | 'email',
    css: string
}

type DataRegisterType = {
    fields: FieldDataType[],
    fieldsChecking: FieldDataType[],
    initialValues: InitialValuesDataType,
    validation: any
}

export const registrationFields = [
    "name",
    "surname",
    "email",
    "password",
    "gender",
    "categories",
    "isSubscribe",
    "bornAt",
]

export const dataRegister: DataRegisterType = {
    fields: [
        {name: 'firstName', label: 'Имя', type: 'text', css: 'inputName'},
        {name: 'surname', label: 'Фамилия', type: 'text', css: 'inputName'},
        {name: 'email', label: 'Email', type: 'text', css: 'inputName'},
        {name: 'password', label: 'Пароль', type: 'text', css: 'inputName'},
        {name: 'confirmPassword', label: 'Повторите пароль', type: 'text', css: 'inputName'},
    ],

    fieldsChecking: [
        {name: 'secretQuestion', label: 'Введите секретный вопрос для восановленя пароля', type: 'text', css: 'inputName'},
        {name: 'answer', label: 'Ответ на секретный вопрос', type: 'text', css: 'inputName'},
    ],

    initialValues: {
        firstName: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        secretQuestion: "",
        answer: "",
        categories: [],
        gender: 1,
        isSubscribe: true,
        birthDate: new Date().toJSON().slice(0, 10).replace(/-/g, "/")
    },

    validation: validationsShema,

}
