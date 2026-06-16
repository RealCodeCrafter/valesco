import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import imgDesktop1 from "../../assets/banner/herobg1.webp"
import imgDesktop2 from "../../assets/banner/herobg2.webp"
import imgDesktop3 from "../../assets/banner/herobg3.webp"
import imgDesktop4 from "../../assets/banner/herobg4.webp"

import mobile1 from "../../assets/banner/mobil1.webp"
import mobile2 from "../../assets/banner/mobil2.webp"
import mobile3 from "../../assets/banner/mobil3.webp"
import mobile4 from "../../assets/banner/mobil4.webp"

import mobile1Ru from "../../assets/banner/mobil1Ru.webp"
import mobile2Ru from "../../assets/banner/mobil2Ru.webp"
import mobile3Ru from "../../assets/banner/mobil3Ru.webp"
import mobile4Ru from "../../assets/banner/mobil4Ru.webp"

import imgDesktopRu1 from "../../assets/banner/herobgru1.webp"
import imgDesktopRu2 from "../../assets/banner/herobgru2.webp"
import imgDesktopRu3 from "../../assets/banner/herobgru3.webp"
import imgDesktopRu4 from "../../assets/banner/herobgru4.webp"
import { useTranslation } from 'react-i18next'

import "./hero.scss"

const Hero = () => {
  const { t, i18n } = useTranslation()
  console.log(i18n?.languages?.[0]);

  const [activeIndex, setActiveIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const slidesDesktop = [imgDesktop1, imgDesktop2, imgDesktop3, imgDesktop4]
  const slidesDesktopRu = [imgDesktopRu1, imgDesktopRu2, imgDesktopRu3, imgDesktopRu4]
  const slidesMobile = [mobile1, mobile2, mobile3, mobile4]
  const slidesMobileRu = [mobile1Ru, mobile2Ru, mobile3Ru, mobile4Ru]

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 780
  const langHero = isMobile
    ? (i18n?.languages?.[0] === "ru" ? slidesMobileRu : slidesMobile)
    : (i18n?.languages?.[0] === "ru" ? slidesDesktopRu : slidesDesktop)

  return (
    <div className='hero'>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper"
      >
        {
          langHero?.map((el, index) => (
            <SwiperSlide key={index}>
              <img src={el} alt={`Hero ${index + 1}`} />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className="custom-pagination container">
        {langHero.map((_, index) => (
          <div
            key={index}
            className={`pagination-line ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="line-wrapper">
              <div className="line-progress"></div>
            </div>
            <div className="line-number">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Hero