import React from 'react'
import "./prideArea.scss"
import { MdArrowOutward } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useGetProductsQuery } from '../../context/api/productApi'
import { useGetCategoriesByIdQuery } from '../../context/api/categoryApi'
import { useTranslation } from 'react-i18next'
import img from "../../assets/images/sp-tec1.webp"
import img1 from "../../assets/images/sp-tec2.webp"
import img2 from "../../assets/images/sp-tec3.webp"

const PrideArea = () => {
    const { t, i18n } = useTranslation()
    const { data } = useGetCategoriesByIdQuery(10)

    const Data = [
        {
            id: 1,
            img: img,
            title: "EUROTEC GTX7000 0W-20 SN/GF-5",
            link: 69
        },
        {
            id: 2,
            img: img1,
            title: "SP-TEC GP7000 0W-30 SP",
            link: 89
        },
        {
            id: 3,
            img: img2,
            title: "SP-TEC GP7000 0W-40 SP",
            link: 91
        }
    ]

    return (
        <div className='prideArea'>
            <div className="prideArea__container container">

                <div className="prideArea__top">
                    <h2 className="prideArea__top-title">{t("Наша")}</h2>
                    <p className="prideArea__top-text"><span>{t("основе")}</span> – {t("премиальная")}</p>
                    <NavLink to={"/categories/10"}>
                        <button className='prideArea__bottom-btn'>{t("Все")}<MdArrowOutward /></button>
                    </NavLink>
                </div>

                <div className="prideArea__bottom">
                    <div className="prideArea__bottom-cards">
                        {
                            Data?.map(el => (
                                <div key={el?.id} className="prideArea__bottom-card">
                                    <div className="prideArea__bottom-card-img">
                                        <NavLink to={`/singleProduct/${el?.link}`}>
                                            <img src={el?.img} alt={el?.title} />
                                        </NavLink>
                                    </div>
                                    <h3 className="prideArea__bottom-card-title">{el?.title}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrideArea