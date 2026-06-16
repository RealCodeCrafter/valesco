import React, { useEffect } from 'react'
import img from "../../assets/images/unical.jpg"
import "./unical.scss"

const Unical = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const UNICAL = [
        {
            id: 1,
            title: "Вдохновение из разных источников"
        },
        {
            id: 2,
            title: "Инновационное мышление"
        },
        {
            id: 3,
            title: "Свежие подходы и решения"
        },
        {
            id: 4,
            title: "Профессиональный опыт"
        },
        {
            id: 5,
            title: "Непревзойденная производительность"
        },
        {
            id: 6,
            title: "Возможности высшего уровня"
        },
        {
            id: 7,
            title: "Высокая работоспособность"
        },
        {
            id: 8,
            title: "Уверенность в качестве"
        },
        {
            id: 9,
            title: "Интеллектуальный подход к задачам"
        }
    ]

    return (
        <div className='unical container'>
            <div className="unical-top">
                <h2 className="unical-top-title">Уникальность бренда</h2>
                <div className="unical-top-imgs">
                    <img src={img} alt="unical-img" />
                </div>
            </div>

            <div className="unical-brand">
                <h2 className="unical-brand-title">Бренд Valesco</h2>
                <div className="unical-brand-info">
                    <h2 className="unical-brand-info-title">Бренд Valesco принадлежит компании по производству смазочных материалов SK Enmove.</h2>
                    <p className='unical-brand-info-text'>Уникальная идентичность бренда Valesco строится на трех главных компонентах: креативность, технологии и премиальное качество.</p>
                    <p className='unical-brand-info-text'>В свою очередь, мышление, продукт и ценность, которую мы создаем, — это три главных аспекта, при помощи которых мы развиваем бренд Valesco.</p>
                    <p className='unical-brand-info-text'>Наша главная цель — это предоставлять продукты, которые опережают свое время, используя творческий подход и новейшие технологии.</p>
                </div>
            </div>

            <div className="unical-core">
                <h2 className="unical-core-title">основная идентичность</h2>
                <div className="unical-core-boxs">

                    <div className="unical-core-box">
                        <h3 className="unical-core-box-title">Креативность</h3>
                        <p className="unical-core-box-text">Решения, основанные на творческом подходе</p>
                    </div>

                    <div className="unical-core-box">
                        <h3 className="unical-core-box-title">Технологии</h3>
                        <p className="unical-core-box-text">Инновации, отражающие актуальные технологические возможности</p>
                    </div>

                    <div className="unical-core-box">
                        <h3 className="unical-core-box-title">Премиальное качество</h3>
                        <p className="unical-core-box-text">Продукты превосходного качества</p>
                    </div>

                </div>
            </div>

            <div className="unical-expand">

                <h2 className="unical-expand-title">развернутая идентичность</h2>

                <div className="unical-expand-cards">
                    {
                        UNICAL?.map(el => (
                            <div key={el?.id} className="unical-expand-card">
                                <h4 className="unical-expand-card-text">{el?.title}</h4>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className="unical-cut">
                <h2 className="unical-cut-title">суть бренда</h2>
                <div className="unical-cut-box">
                    <p className="unical-cut-box-desc">Современный премиум</p>
                </div>
            </div>
        </div>
    )
}

export default Unical