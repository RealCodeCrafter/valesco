import React from 'react'
import "./callTo.scss"
import { CALLTO, CALLTOEN } from '../../static'
import { MdArrowOutward } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const CallTo = () => {
    const { t, i18n } = useTranslation()
    const currentLang = i18n?.languages[0]
    const cardCALLTO = currentLang === "ru" ? CALLTO : CALLTOEN

    return (
        <div className='callTo container'>
            <div className="callTo__left">
                <h1 className="callTo__left-title">{t("Хочешь")}</h1>
                <p className="callTo__left-text">{t("дорожим")}</p>
            </div>
            <div className="callTo__right">
                {
                    cardCALLTO?.map(el => (
                        <div key={el?.id} className="callTo__card">
                            <h2 className="callTo__card-title">{el?.title}</h2>
                            <p className="callTo__card-text">{t("Узнать больше")}<MdArrowOutward /></p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CallTo