import React from 'react'
import "./differents.scss"
import { MdArrowOutward } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

import img1 from "../../assets/images/differ1.webp"
import img2 from "../../assets/images/differ2.webp"
import { NavLink } from 'react-router-dom'

const Differents = () => {
    const { t, i18n } = useTranslation()
    return (
        <div className='differents container'>
            <div className="differents__left">
                <h1 className="differents__left-title">{t("делает")}</h1>
                <p className="differents__left-text">{t("большим")}</p>
                <p className="differents__left-desc">{t("масел")}</p>
                <NavLink to={"/about"} className='differents__left-btn'>{t("Узнать больше")}<MdArrowOutward /></NavLink>
            </div>

            <div className="differents__right">
                <img className='differents__right-topImg' src={img1} alt="different img-top" />
                <img className='differents__right-bottomImg' src={img2} alt="different img-bottom" />
            </div>
        </div>
    )
}

export default Differents