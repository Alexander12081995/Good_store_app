import {Table, Input, Select, Slider, Button} from "antd";
import {LOAD_STATUSES} from "../../types";
import {Loader} from "../Common";
import {optionsSelectParams, useAdminGoods} from "./useAdminGoods";
import css from "./adminGoods.module.css";


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

    const {Search} = Input

    return (
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
                    <Select defaultValue="Выберите параметры" options={optionsSelectParams}
                            onChange={handleOnChangeSelectParams}/>
                </div>
                <div className={css.sort}>
                    <Button onClick={resetParams}>Сбросить параметры</Button>
                </div>

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
                    onRow={(record) => ({
                        onClick: () => {
                            handleRowClick(record)
                        }
                    })}
                    pagination={{
                        pageSize: params.limit,
                        current: params.offset / params.limit + 1,
                        pageSizeOptions: [5, 10, 20],
                        total
                    }}
                    columns={columns} dataSource={dataSource}/>}
        </div>
    )
}
