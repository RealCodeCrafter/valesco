import React, { useEffect } from 'react'
import img from "../../../assets/icons/logo1.jpg"
import "./footer.scss"
import { NavLink } from 'react-router-dom'
import { useGetCategoriesQuery } from '../../../context/api/categoryApi'
import { useTranslation } from 'react-i18next'
import { useGetValue } from '../../../hooks/useGetValue'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useCreateContactMutation } from '../../../context/api/contactApi'
import { toast } from 'react-toastify'

const initialState = {
  name: "",
  phone: "",
  email: "",
  message: ""
}

const Footer = () => {
  const { data } = useGetCategoriesQuery()
  const { t, i18n } = useTranslation()
  const { formData, setFormData, handleChange } = useGetValue(initialState)
  const [contactForm, { isSuccess, isError }] = useCreateContactMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    contactForm(formData);
    setFormData(initialState);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Сообщение успешно отправлено!")
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error("Ошибка отправки сообщения!")
    }
  }, [isError])

  return (
    <footer className='footer'>
      <div className="footer-line"></div>
      <nav className="footer__nav container">
        <ul className="footer__item">
          <h3 className='footer__item-title'>{t("ПРОДУКЦИЯ")}</h3>
          {
            data?.map((el, index) => (
              <li key={index} className="footer__item-list">
                <NavLink to={`/categories/${el?.id}`}>
                  {
                    i18n?.language === "ru"
                      ?
                      el?.title?.ru
                      :
                      el?.title?.en
                  }
                </NavLink>
              </li>
            ))
          }
        </ul>

        <ul className="footer__item">
          <h3 className='footer__item-title'>{t("КОМПАНИЯ")}</h3>
          <li className="footer__item-list"><NavLink to={"/about"}>{t("company")}</NavLink></li>
          <li className="footer__item-list"><NavLink to={"/news"}>{t("news")}</NavLink></li>
          <li className="footer__item-list"><NavLink to={"/distrbut"}>{t("distributors")}</NavLink></li>
          <li className="footer__item-list"><NavLink to={"/contact"}>{t("contacts")}</NavLink></li>
        </ul>

        <ul className="footer__item">
          <h3 className='footer__item-title'>{t("Контакты")}</h3>
          <li className="footer__item-contact">
            <span>{t("телефона")}</span>
            <a href="tel:+998 71 281 49 30">+998 71 281 49 30</a>
            <a href="tel:+998 71 203 20 31">+998 71 203 20 31</a>
          </li>

          <li className="footer__item-contact footer__item-contact-span">
            <span>{t("address")}</span>
            {t("addressValesco")}
          </li>

          <li className="footer__item-contact">
            <span>{t("E-mail")}</span>
            <a href="mailTo:info@gpggroup.uz">info@gpggroup.uz</a>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className='footer__form' action="">
          <h3 className='footer__item-title'>{t("LEAVE")}</h3>
          <input
            name='name'
            onChange={handleChange}
            value={formData.name}
            required
            placeholder={t('Name')}
            type="text"
          />
          <PhoneInput
            country={'uz'}
            enableSearch={true}
            inputStyle={{
              width: "100%",
              height: "44px",
              fontSize: "15px"
            }}
            required
            containerStyle={{ width: "100%" }}
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />
          <input
            name='email'
            onChange={handleChange}
            value={formData.email}
            placeholder={t('Email')}
            required
            type="text"
          />
          <textarea
            placeholder={t('Message')}
            name="message"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
          <button className='footer__form-btn'>{t("Send Now")}</button>
        </form>
      </nav>
    </footer>
  )
}

export default Footer