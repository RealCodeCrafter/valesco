import React, { useEffect } from 'react'
import "./oil.scss"

const Oil = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='oil container'>
            <div className="oil-top">
                <h2 className='oil-top-title'>сервис подбора масла</h2>
            </div>

            <div className="oil-dannim">
                <h2 className="oil-dannim-title">по данным автомобиля</h2>
                <div className="oil-dannim-selects">
                    <p className="oil-dannim-selects-title">Воспользуйтесь нашим сервисом по подбору масел, используя данные вашего автомобиля.</p>
                    <select className="oil-dannim-select">
                        <option>Легковые автомобили</option>
                    </select>

                    <select className="oil-dannim-select">
                        <option>Марка</option>
                    </select>

                    <select className="oil-dannim-select">
                        <option>Модель</option>
                    </select>

                    <select className="oil-dannim-select">
                        <option>Двигатель</option>
                    </select>

                    <button className="oil-dannim-button" disabled>
                        Подобрать
                    </button>
                </div>
            </div>

            <div className="oil-analog">
                <h2 className="oil-analog-title">по аналогу</h2>
                <div className="oil-analog-selects">
                    <p className="oil-analog-selects-title">Вы можете подобрать моторное масло Valesco аналогичное или близкое по характеристикам к тому продукту, которым вы пользуетесь в настоящее время.</p>
                    <select className="oil-analog-select">
                        <option>Бренд</option>
                    </select>

                    <select className="oil-analog-select">
                        <option>Серия *</option>
                    </select>

                    <select className="oil-analog-select">
                        <option>Вязкость *</option>
                    </select>

                    <select className="oil-analog-select">
                        <option>Продукт *</option>
                    </select>

                    <button className="oil-analog-button" disabled>
                        Подобрать
                    </button>

                    <div className="oil-analog-selects-bottom-title">* Не обязательные для выбора поля, которые необходимы для осуществления более точного подбора. Если не выбрано ничего, то подбор будет осуществляться по полному перечню продуктов.</div>
                </div>
            </div>
        </div>
    )
}

export default Oil