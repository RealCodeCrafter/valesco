import React from 'react'
import "./heroTop.scss"
import { useTranslation } from 'react-i18next'

const HeroTop = () => {
    const { t, i18n } = useTranslation()

    return (
        <div className='heroTop'>
            <div className="heroTop__container container">
                <h2 className="heroTop__title">{t("world")}</h2>
                <p className="heroTop__text">{t("mir")}</p>
            </div>
        </div>
    )
}

export default HeroTop