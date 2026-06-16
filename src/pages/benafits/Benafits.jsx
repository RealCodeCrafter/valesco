import React, { useEffect } from 'react'

import "./benafits.scss"
import { BENAFITS } from '../../static'

const Benafits = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='benafits container'>
            <div className="benafits-top">
                <h2 className="benafits-top-title">преимущества Valesco</h2>
                <div className="benafits-top-imgs">
                    {/* <img src={img} alt="benafits-img" /> */}
                </div>
            </div>

            <div className="benafits-sass">
                <p className="benafits-sass-title">Состав</p>
                <div className="benafits-sass-info">
                    <p className="benafits-sass-info-text">
                        Valesco способствует повышению производительности двигателей и обеспечивает превосходную защиту даже в экстремальных климатических условиях.</p>
                    <p className="benafits-sass-info-text">100% Синтетическое моторное масло. Смешано с базовым маслом Valesco самого высокого качества в мире.</p>
                    <p className="benafits-sass-info-text">Самым большим преимуществом Valesco является то, что в нем используется лучшее в мире базовое масло III группы - EUROTEC.</p>
                    <p className="benafits-sass-info-text">EUROTEC - это собственный бренд VALESCO, который занимает около 40% мирового рынка премиум-класса III группы.</p>
                </div>
            </div>

            <div className="benafits-advent">
                <h2 className="benafits-advent-title">10 уникальных преимуществ</h2>
                <div className="benafits-advent-info">
                    <p className="benafits-advent-info-title">Преимущества Valesco создают лучшее на рынке соотношение «цена-качество»!</p>
                    <table className="benefits-table">
                        <tbody>
                            {BENAFITS?.map((el) => (
                                <tr key={el?.id} className="benefits-row">
                                    <td className="benefits-id">{el?.id.toString().padStart(2, '0')}</td>
                                    <td className="benefits-title">{el?.title}</td>
                                    <td className="benefits-text">{el?.text}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Benafits