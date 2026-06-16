import React, { useEffect, useState } from 'react'
import "./publications.scss"
import { PUBLIC } from '../../static'
import { MdArrowOutward } from 'react-icons/md'

const Publications = () => {
  const [hide, setHide] = useState(6)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = () => {
    setHide(prev => prev + 5)
  }

  return (
    <div className='public container'>
      <h2 className="public-title">
        За максимальную
        подкованность в знаниях
      </h2>

      <div className="public-cards">
        <div></div>
        <div className="public-boxs">
          {
            PUBLIC?.slice(0, hide)?.map(el => (
              <div key={el?.id} className="public-box">
                <div className="public-box-info">
                  <h3 className="public-box-info-title">{el?.title}</h3>
                  <p className="public-box-info-text">{el?.text}</p>
                </div>
                <button className='public-box-btn'>Подробнее<MdArrowOutward /></button>
              </div>
            ))
          }
          <button className='public-click' onClick={handleChange}>Загрузить еще</button>
        </div>
      </div>
    </div>
  )
}

export default Publications