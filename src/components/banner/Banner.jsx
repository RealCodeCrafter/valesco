import React from 'react'
import './banner.scss'
import { MdArrowOutward } from 'react-icons/md'
import { BANNER, BANNEREN } from '../../static'
import { useTranslation } from 'react-i18next'

const Banner = () => {
    const { t, i18n } = useTranslation()
    const lenguage = i18n?.languages[0]

    const lenguageCard = lenguage == "ru" ? BANNER : BANNEREN

    return (
        <div className='banner'>
            <div className="banner__container container">
                <div className="banner__top">
                    <h2 className='banner__top-title'>{t("Почему Valesco")}</h2>
                    <p className='banner__top-text'>
                        {t("способствует")}
                    </p>
                </div>

                <div className="banner__cards">
                    {
                        lenguageCard?.map(el => (
                            <div key={el?.id} className="banner__card">
                                <div className="shine"></div>
                                <h2 className="banner__card-title">{el?.title}</h2>
                                <p className='banner__card-text'>{el?.text}</p>
                                <p className="banner__card-desc">{t("Узнать больше")} <MdArrowOutward /></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner