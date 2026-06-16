import React, { useEffect } from 'react'
import { GrMapLocation } from "react-icons/gr";
import { MdArrowOutward, MdOutlineMail } from 'react-icons/md';
import { LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import "./contact.scss"
import { useGetValue } from '../../hooks/useGetValue';
import { toast } from 'react-toastify';
import { useCreateContactMutation } from '../../context/api/contactApi';

const initialState = {
  name: "",
  phone: "",
  email: "",
  country: "",
  company: "",
  message: ""
}

const Contact = () => {
  const { t, i18n } = useTranslation()
  const { formData, setFormData, handleChange } = useGetValue(initialState)
  const [contactForm, { data, isError, isLoading, isSuccess }] = useCreateContactMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    contactForm(formData);
    setFormData(initialState)
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

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <div className='contact'>
      <div className="contact-top"></div>
      <div className="contact-form container">
        <div className="contact-form-left">
          <div className="contact-form-left-info">
            <h3 className="contact-form-left-info-title">{t("Details")}</h3>
            <p className="contact-form-left-info-text">{t("questions")}</p>
          </div>

          <div className="contact-form-left-box">
            <IoLocationOutline />
            <div className="contact-form-left-box-info">
              <h3 className="contact-form-left-box-info-title">{t("Address")}</h3>
              <p className="contact-form-left-box-info-text">{t("Republic")}</p>
            </div>
          </div>

          <div className="contact-form-left-box">
            <MdOutlineMail />
            <div className="contact-form-left-box-info">
              <h3 className="contact-form-left-box-info-title">{t("E-mail")}</h3>
              <p className="contact-form-left-box-info-text">info@gpggroup.uz</p>
            </div>
          </div>

          <div className="contact-form-left-box">
            <LuPhone />
            <div className="contact-form-left-box-info">
              <h3 className="contact-form-left-box-info-title">{t("Call support")}</h3>
              <p className="contact-form-left-box-info-text"><a href="tel: +998 71 281 49 30"> +998 71 281 49 30</a></p>
              <p className="contact-form-left-box-info-text"><a href="tel: +998 71 203 20 31">+998 71 203 20 31</a></p>
            </div>
          </div>

        </div>

        <form onSubmit={handleSubmit} action="" className="contact-form-right">
          <h3 className='contact-top-title'>{t("Contact Us")}</h3>

          <div className="contact-form-right-top">

            <label htmlFor="">
              <input required name='name' onChange={handleChange} value={formData.name} placeholder={t('Name')} type="text" />
            </label>

            <label htmlFor="">
              <PhoneInput
                country={'uz'}
                enableSearch={true}
                required
                inputStyle={{
                  width: "100%",
                  height: "55px",
                  fontSize: "15px"
                }}
                containerStyle={{ width: "100%" }}
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            </label>

            <label htmlFor="">
              <input required name='email' onChange={handleChange} value={formData.email} placeholder={t('Email')} type="text" />
            </label>

            <label htmlFor="">
              <input required name='country' onChange={handleChange} value={formData.country} placeholder={t('Country')} type="text" />
            </label>

          </div>

          <div className="contact-form-right-bottom">

            <label htmlFor="">
              <input required name='company' onChange={handleChange} value={formData.company} placeholder={t('Company')} type="text" />
            </label>

            <label htmlFor="">
              <textarea name="message" onChange={handleChange} value={formData.message} placeholder={t('Message')} id=""></textarea>
            </label>

            <button className="contact-form-right-bottom-btn">{t("Send Now")}</button>

          </div>

        </form>

      </div>

      <div className="contact-maps">
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3248.230692956812!2d69.136341!3d41.200520000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDEyJzAxLjkiTiA2OcKwMDgnMTAuOCJF!5e1!3m2!1sen!2s!4v1762319654663!5m2!1sen!2s" style={{ width: "100%", height: "450px", border: "0px" }} loading="lazy"></iframe>
      </div>

    </div>
  )
}

export default Contact