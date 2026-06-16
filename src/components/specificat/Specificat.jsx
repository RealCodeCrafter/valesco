import React from 'react'
import "./specificat.scss"
import { useTranslation } from 'react-i18next'

const Specificat = ({ data }) => {
  const { t, i18n } = useTranslation()

  return (
    <div id='specy' className='specificat container'>
      <h2 className='specificat-title'>{t("Спецификации")}</h2>
      <ul className="specificat-item">
        {
          data?.map((el, index) => (
            <li key={index} className="specificat-list">{el}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Specificat