import React from 'react'
import "./mission.scss"
import { MdArrowOutward } from 'react-icons/md'
import { MISSION, MISSIONEN } from '../../static'
import { useTranslation } from 'react-i18next'

const Mission = () => {
    const { t, i18n } = useTranslation()
    const currentLanguage = i18n?.languages[0]
    const cardMission = currentLanguage == "ru" ? MISSION : MISSIONEN

    return (
        <div className='mission'>
            <div className="container mission-container">
                <div className="mission-top">
                    <h1 className="mission-top-title">{t("company")}</h1>
                </div>
                <div className="mission-cards">
                    {
                        cardMission?.map(el => (
                            <div key={el?.id} className="mission-card">
                                <h2 className="mission-card-title">{el?.price}</h2>
                                <div className="mission-card-info">
                                    <p className="mission-card-info-text">{el?.title}</p>
                                    <p className="mission-card-info-desc">{t("Узнать больше")}<MdArrowOutward /></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Mission