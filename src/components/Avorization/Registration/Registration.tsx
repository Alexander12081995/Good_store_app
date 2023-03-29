import {dataRegister} from "./registrationType";
import {useSelector} from "react-redux";
import {getCategories} from "../../../store/categories/selectors";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useEffect} from "react";
import {actions} from "../../../store/categories/reducer";
import {Field, Formik} from "formik";
import {Input, Radio, Switch, DatePicker, Button} from "antd";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import css from "./registration.module.css"

export const Registration = () => {

    const categories = useSelector(getCategories);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.fetchCategory())
    }, [])

    return (
        <div className={css.form}>
            <Formik initialValues={dataRegister.initialValues}
                    onSubmit={(values, {resetForm}) => {
                        console.log(values)
                        resetForm()
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={dataRegister.validation}
            >
                {({values, errors, handleSubmit, handleChange, setFieldValue}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            {dataRegister.fields.map((field) => <div key={field.name} className={css.groupInput}>
                                {field.label && <label htmlFor={field.name}>{field.label}</label>}
                                <Input type={field.type}
                                       name={field.name}
                                       onChange={handleChange}
                                       value={values[field.name]}
                                       className={css.infoUser}
                                />
                                {errors[field.name] && <p className={css.error}>{errors[field.name]}</p>}
                            </div>)}
                            <div className={css.groupInput}>
                                <span>Выберите пол: </span>
                                <Radio.Group name="gender" onChange={handleChange} value={values.gender} >
                                    <Radio value={1}>Мужской</Radio>
                                    <Radio value={2}>Женский</Radio>
                                </Radio.Group>
                                <br/>
                            </div>
                            <div className={css.groupInput}>
                                <span>Выберите любимые категории:</span><br/>
                                <div>
                                        {categories.map((category) =>
                                            <label key={category.id} className={css.groupCheckbox}>
                                                <Field type='checkbox'
                                                       name='categories'
                                                       value={category.label}
                                                       onChange={handleChange}/>
                                                <span>{category.label}</span>
                                            </label>
                                        )}
                                </div>
                                {errors.categories && <p className={css.error}>{errors.categories}</p>}
                            </div>
                            <div className={css.groupInput}>
                                <span>Подпсаься на новости OZ.by</span>
                                <Switch checked={values.sendNotification}
                                        onChange={(value) => setFieldValue('sendNotification', value)}/>
                            </div>

                            <div className={css.groupInput}>
                                <span>Выберите дату рождения:</span>
                                <DatePicker name='birthDate'
                                            value={dayjs(values.birthDate)}
                                            clearIcon={false}
                                            onChange={(date, dateString) => setFieldValue("birthDate", new Date(dateString))}
                                />
                                {errors.birthDate && <p className={css.error}>{errors.birthDate}</p>}
                            </div>
                            {dataRegister.fieldsChecking.map((field) => <div key={field.name} className={css.groupInput}>
                                {field.name === "answer" ? values.secretQuestion &&
                                    <div>
                                        {field.label && <label htmlFor={field.name}>{field.label}</label>}
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            onChange={handleChange}
                                            value={values[field.name]}

                                        />
                                        {errors[field.name] && <p className={css.error}>{errors[field.name]}</p>}
                                    </div>
                                    :
                                    <div>
                                        {field.label && <label htmlFor={field.name}>{field.label}</label>}
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            onChange={handleChange}
                                            value={values[field.name]}

                                        />
                                        {errors[field.name] && <p className={css.error}>{errors[field.name]}</p>}
                                    </div>
                                }
                            </div>)}
                            <div className={css.groupBtn}>
                                <Button
                                    htmlType="submit"
                                >
                                    Зарегистрироваться
                                </Button>
                                <Link to="/">
                                    <Button>Отмена</Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
