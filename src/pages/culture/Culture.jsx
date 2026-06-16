import React, { useEffect } from 'react'
import "./culture.scss"
import { FaArrowRight, FaArrowUp, FaPlus } from 'react-icons/fa'

const Culture = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='culture container'>
      <div className="culture-top">
        <h2 className="culture-top-title">Корпоративная культура</h2>
      </div>

      <div className="culture-box">
        <div className="culture-box-info">
          <h2 className="culture-box-info-title">Корпоративная культура VALESCO</h2>
          <div className="culture-box-info-right">
            <h2 className="culture-box-info-right-title">
              Сотрудники VALESCO вместе создают «Культуру победы»</h2>
            <p className="culture-box-info-right-text">В VALESCO мы ценим профессионалов, которым не все равно. Мы поощряем инициативу, чтобы вместе преодолевать кризисные ситуации и находить возможности для дальнейшего роста.</p>
            <div className="culture-box-cards">
              <div className="culture-box-card">
                <div className="culture-box-card-info">
                  <p className="culture-box-card-info-text">Разделение целей</p>
                  <p className="culture-box-card-info-text">Прозрачная коммуникация между сотрудниками всех уровней</p>
                  <p className="culture-box-card-info-text">Смелые инициативы</p>
                  <p className="culture-box-card-info-text">Лучшие смазочные материалы</p>
                </div>
              </div>

              <div className="culture-box-line"><FaArrowRight /></div>
              <div className="culture-box-card">
                <p className="culture-box-card-info-title">культура победы</p>
              </div>

              <div className="culture-box-line-top"><FaArrowUp /></div>
              <div className="culture-box-card">
                <p className="culture-box-card-info-title">профессионализм</p>
                <div className="culture-box-card-info">
                  <p className="culture-box-card-info-text">Глубокое понимание сферы смазочных материалов</p>
                  <p className="culture-box-card-info-text">Высокая конкурентоспособность</p>
                  <p className="culture-box-card-info-text">Дух победителя</p>
                </div>
              </div>

              <div className="culture-box-line-plus"><FaPlus /></div>
              <div className="culture-box-card">
                <div className="culture-box-card-info">
                  <p className="culture-box-card-info-text">Самодисциплина</p>
                  <p className="culture-box-card-info-text">Укоренившиеся взгляды и поведение</p>
                  <p className="culture-box-card-info-text">Уважение и забота</p>
                </div>
                <p className="culture-box-card-info-title">ответственность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Culture