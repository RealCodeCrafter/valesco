import React, { useEffect } from 'react'
import "./impact.scss"
import { IMPACT } from '../../static'

const Impact = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='impact container'>
      <div className="impact-top">
        <h1 className="impact-top-title">
          социальная ответственность</h1>
        <div className="impact-top-imgs">
          <img src={img} alt="impact-top-img" />
        </div>
      </div>

      <div className="impact-nashi">
        <h2 className="impact-nashi-title">наша философия</h2>
        <div className="impact-nashi-info">
          <div className="impact-nashi-info-top">
            <h3 className="impact-nashi-info-top-title">
              В основе успеха бизнеса Valesco лежат удовлетворенность акционеров, достижение максимума SUPEX и победный дух «Pae-gi»</h3>
            <p className="impact-nashi-info-top-desc">MS (система управления ) систематически излагает корпоративную культуру и бизнес-идеологию, а также методы управления  Group. Это эксклюзивная философия управления , которую разделяют и с которой согласны все филиалы</p>
          </div>

          <div className="impact-nashi-info-bottom">
            <div className="impact-nashi-info-bottom-boxs">
              {
                IMPACT?.map(el => (
                  <div key={el?.id} className="impact-nashi-info-bottom-box">
                    <h3 className="impact-nashi-info-bottom-box-title">{el?.title}</h3>
                    <p className="impact-nashi-info-bottom-box-desc">{el?.text}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impact