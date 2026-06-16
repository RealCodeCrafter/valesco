import React, { useState, useEffect, useRef } from 'react'
import "./about.scss"

import { FaCircleChevronRight } from "react-icons/fa6";
import icons2 from "../../assets/icons/icon-2.svg"
import icons3 from "../../assets/icons/icon-3.svg"
import icons4 from "../../assets/icons/icon-4.svg"

import logo from "../../assets/icons/icon-1.svg"
import { MISSION, MISSIONEN } from '../../static';
import img from "../../assets/images/hero-2.jpg"
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdArrowOutward } from 'react-icons/md';

const About = () => {
  const { t, i18n } = useTranslation()
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  const MISSIONDATA = i18n.language === "ru" ? MISSION : MISSIONEN

  const [counts, setCounts] = useState({ staff: 0, containers: 0, products: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const targets = { staff: 300, containers: 3000, products: 300 };
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        staff: Math.floor(targets.staff * easeOut),
        containers: Math.floor(targets.containers * easeOut),
        products: Math.floor(targets.products * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targets);
      }
    }, stepDuration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && count < 100) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [count, isVisible]);

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <div className='about'>
      <div className="about-top">
        <div className="about-top-box container">

          <div className="about-top-info container">
            <h2 className="about-top-title">{t("About Company")}</h2>
            <p className='about-top-text about-top-desc'>{t("Наша компания")}</p>
            <p className='about-top-text'>{t("начало")}</p>
            <p className='about-top-text'>{t("производства")}</p>
            <p className='about-top-text'>{t("Продукция компании")}</p>
          </div>

          <div></div>
        </div>
      </div>

      <div className="about-middle container">
        <div className="about-middle-top">

          <div className="about-middle-top-box" ref={counterRef}>
            <img src={logo} alt="" />
            <div className="about-middle-top-box-info">
              <p className="about-middle-top-box-info-text">{count}%</p>
              <h2 className="about-middle-top-box-info-title">{t("Guarantee")}</h2>
            </div>
          </div>

          <div className="about-middle-top-info">
            <h2 className="about-middle-top-info-title">{t("Performance")}</h2>
            <p className="about-middle-top-info-text">{t("confidence")}</p>
          </div>

          <div className="about-middle-top-right">
            <p className="about-middle-top-right-title"><FaCircleChevronRight />{t("Long-lasting")}</p>
            <p className="about-middle-top-right-title"><FaCircleChevronRight />{t("Reduced")}</p>
            <p className="about-middle-top-right-title"><FaCircleChevronRight />{t("Advanced")}</p>
          </div>

        </div>
      </div>

      <div className="about-cards container">
        {
          MISSIONDATA?.map(el => (
            <div key={el?.id} className='about-card'>
              <h3 className="about-card-title">{el?.price}</h3>
              <p className="about-card-text">{el?.title}</p>
            </div>
          ))
        }
      </div>

      <div className="about-imgs container" ref={sectionRef}>
        <div className="about-imgs-left">
          <img src={img} alt="about-img" />
        </div>

        <div className="about-imgs-right-box">
          <div className="about-imgs-right">
            <h1 className='about-imgs-right-title'>{t("About Valesco Oil")}</h1>
            <p className='about-imgs-right-desc'>{t("more than")}</p>
          </div>

          <div className="about-imgs-rowe">
            <div className="about-imgs-rowe-card">
              <img src={icons3} alt="" />
              <h2 className="about-imgs-rowe-card-title">{counts.staff}</h2>
              <p className="about-imgs-rowe-card-text">{t("Members of staff")}</p>
            </div>

            <div className="about-imgs-rowe-card">
              <img src={icons4} alt="" />
              <h2 className="about-imgs-rowe-card-title">{counts.containers.toLocaleString()}</h2>
              <p className="about-imgs-rowe-card-text">{t("Containers per hour")}</p>
            </div>

            <div className="about-imgs-rowe-card">
              <img src={icons2} alt="" />
              <h2 className="about-imgs-rowe-card-title">{counts.products}</h2>
              <p className="about-imgs-rowe-card-text">{t("Products")}</p>
            </div>
          </div>

          <NavLink className='about-imgs-right-btn' to={"/contact"}>{("Contact Us")}<MdArrowOutward /></NavLink>
        </div>
      </div>

    </div>
  )
}

export default About