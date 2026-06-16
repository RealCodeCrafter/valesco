import React from 'react'
import "./media.scss"
import { FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

import img2 from "../../assets/images/new2.webp"
import img3 from "../../assets/images/new3.webp"
import { useTranslation } from 'react-i18next';

const Media = () => {
    const { t } = useTranslation()

    return (
        <div className='media container'>

            <div className="media-left">
                <h2 className="media-left-title">
                    {t("Follow")}<br />
                    <span>{t("Social Media")}</span>
                </h2>

                <span className="media-left-text">{t("connected")}</span>
            </div>

            <div className="media-right">

                <a target='_blank' href="https://www.instagram.com/valescooil_official_global/">
                    <div className="media-right-card">

                        <div className="media-right-card-logo instagram">
                            <AiFillInstagram />
                        </div>

                        <div className="media-right-card-img">
                            <img src={img2} alt="media-img-two" />
                        </div>

                        <button className="media-right-card-btns">{t("Follow Us")}</button>
                    </div>
                </a>

                <a target='_blank' href="https://www.facebook.com/profile.php?id=61577073517931">

                    <div className="media-right-card">
                        <div className="media-right-card-logo facebook">
                            <FaFacebookF />
                        </div>

                        <div className="media-right-card-img">
                            <img src={img3} alt="media-img-three" />
                        </div>

                        <button className="media-right-card-btns">{t("Follow Us")}</button>
                    </div>

                </a>

            </div>

        </div>
    )
}

export default Media
