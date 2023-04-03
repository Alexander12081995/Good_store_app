import {Table, Input, Select, Slider, Button, Modal} from "antd";
import {Good, LOAD_STATUSES} from "../../types";
import {Loader} from "../Common";
import {optionsSelectParams, useAdminGoods} from "./useAdminGoods";
import css from "./adminGoods.module.css";
import {useSelector} from "react-redux";
import {getLogin} from "../../store/login/selector";
import {postGoodInStoreApi} from "../../api";
import {useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {actions} from "../../store/products/reducer";
import {useNavigate} from "react-router";


export const AdminGoods = () => {

    const {
        handleOnChangeSelectParams,
        handleOnChangeSlider,
        handleOnChangeSelect,
        handleRowClick,
        resetParams,
        setParams,
        onSearch,
        loadStatusProducts,
        allCategories,
        dataSource,
        columns,
        params,
        total,
    } = useAdminGoods()


    const dispatch = useAppDispatch()
    const {Search} = Input
    const isAuth = useSelector(getLogin)
    const navigate = useNavigate()
    const [isAddGood, setIsAddGood] = useState<Boolean>(false)
    const [newProduct, setNewProduct] = useState<Omit<Good, 'id'>>({
        label: "",
        categoryTypeId: "",
        description: "",
        price: "",
        img: "",
    })

    const postGoodInStore = () => {
        dispatch(actions.fetchPostGoodInStoreApi(newProduct))
        setIsAddGood(false)
    }



    return (
        <>
            {!isAuth ? navigate("/login") :
            <>
                <div>
                    <div className={css.blockParams}>
                        <div className={css.sort}>
                            <p>Поиск по имени товаров</p>
                            <Search onChange={(e) => onSearch(e.target.value)} placeholder="Введте название" value={params.text}/>
                        </div>
                        <div className={css.sort}>
                            <p>Выберите категорию</p>
                            <Select onChange={handleOnChangeSelect} defaultValue="Все товары" options={allCategories}/>
                        </div>
                    </div>
                    <div>
                        <div className={css.price}>
                            <p>Выберите минимальную(маскимальную) цену</p>
                            <Slider onChange={handleOnChangeSlider} max={1000} range value={[params.minPrice, params.maxPrice]} defaultValue={[0, 1000]}/>
                        </div>
                    </div>
                    <div className={css.blockParams}>
                        <div className={css.sort}>
                            <p>Выберите параметр сортировки</p>
                            <Select defaultValue={"Выберите параметр"} options={optionsSelectParams}
                                    onChange={handleOnChangeSelectParams}/>
                        </div>
                        <div className={css.sort}>
                            <Button onClick={resetParams}>Сбросить параметры</Button>
                        </div>
                    </div>
                    <div className={css.blockParams}>
                        {isAddGood && <Modal open={true} onCancel={() => setIsAddGood(false)} onOk={postGoodInStore}>
                            <Input className={css.input} onChange={(e) => setNewProduct((prevInfo) => ({...prevInfo, categoryTypeId: e.target.value}))} value={newProduct.categoryTypeId} placeholder={"Введите номер категории"}/>
                            <Input className={css.input} onChange={(e) => setNewProduct((prevInfo) => ({...prevInfo, label: e.target.value}))} value={newProduct.label} placeholder={"Введите название товара"}/>
                            <Input className={css.input} onChange={(e) => setNewProduct((prevInfo) => ({...prevInfo, description: e.target.value}))}value={newProduct.description} placeholder={"Введите описание товара"}/>
                            <Input className={css.input} onChange={(e) => setNewProduct((prevInfo) => ({...prevInfo, price: e.target.value}))} value={newProduct.price} placeholder={"Введите цену товара"}/>
                            <Input className={css.input} onChange={(e) => setNewProduct((prevInfo) => ({...prevInfo, img: e.target.value}))} value={newProduct.img} placeholder={"Вставьте картинку"}/>
                        </Modal>}
                        {!isAddGood && <Button onClick={() => setIsAddGood(true)}>Добавить товар</Button>}
                    </div>
                    <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING}/>
                    {loadStatusProducts === LOAD_STATUSES.LOADED &&
                        <Table
                            onChange={({pageSize, current}) => {
                                setParams((prevParams) => ({
                                    ...prevParams,
                                    ...(pageSize !== undefined && {limit: pageSize}),
                                    ...(pageSize !== undefined && current !== undefined && {offset: (current - 1) * pageSize}),
                                }))
                            }}
                            // onRow={(record) => ({
                            //     onClick: () => {
                            //         handleRowClick(record)
                            //     }
                            // })}
                            pagination={{
                                pageSize: params.limit,
                                current: params.offset / params.limit + 1,
                                pageSizeOptions: [5, 10, 20],
                                total
                            }}
                            columns={columns} dataSource={dataSource}/>}
                </div>
            </>
            }


        </>
    )
}
