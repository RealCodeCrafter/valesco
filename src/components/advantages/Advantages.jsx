import React from 'react'
import "./advantages.scss"
import { useTranslation } from 'react-i18next';

const Advantages = ({ data }) => {
  if (!data || data.length === 0) return null;
  const { t, i18n } = useTranslation()

  return (
    <div id='advantages' className='advantages container'>
      <h2 className="advantages-title">{t("Преимущества")}</h2>

      <div className="advantages__info">
        <ul className="advantages-info-item">
          {data.map((text, index) => {
            const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
            return (
              <li key={index} className="advantages-info-item-list">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{formattedText}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Advantages
