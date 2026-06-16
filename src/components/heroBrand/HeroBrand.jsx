import React from 'react'
import "./heroBrand.scss"
import { MdArrowOutward } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HeroBrand = () => {
    const { t, i18n } = useTranslation()

    return (
        <div className='heroBrand '>
            <div className="container heroBrand__container">
                <h2 className="heroBrand__title">{t("brand")}</h2>
                <div className="heroBrand__info">
                    <h3 className="heroBrand__info-title">
                        {t("euroTech")}</h3>
                    <p className="heroBrand__info-text"><span>{t("цель")}</span> — {t("предоставлять")}</p>
                    <NavLink to={"/about"}>
                        <button className="heroBrand__info-btn">{t("Узнать больше")}<MdArrowOutward /></button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default HeroBrand