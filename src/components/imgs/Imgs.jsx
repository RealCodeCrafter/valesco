import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowOutward } from "react-icons/md";
import { NavLink } from "react-router-dom";

import img1 from "../../assets/anime/anime-1.webp";
import img2 from "../../assets/anime/anime-2.webp";
import img3 from "../../assets/anime/anime-3.webp";
import img4 from "../../assets/anime/anime-4.webp";
import img5 from "../../assets/anime/anime-5.webp";
import img6 from "../../assets/anime/anime-6.webp";
import img7 from "../../assets/anime/anime-7.webp";

import "./imgs.scss";

const Imgs = () => {
  const { t, i18n } = useTranslation()

  const PRODUCTS = [
    { id: 1, img: img1, stackPos: 60, expandPos: 70, height: 280, zIndex: 8 },
    { id: 2, img: img2, stackPos: 70, expandPos: 86, height: 220, zIndex: 9 },
    { id: 3, img: img3, stackPos: 50, expandPos: 50, height: 400, zIndex: 6 },
    { id: 4, img: img4, stackPos: 40, expandPos: 31, height: 280, zIndex: 5 },
    { id: 5, img: img5, stackPos: 75, expandPos: 96, height: 180, zIndex: 10 },
    { id: 6, img: img6, stackPos: 32, expandPos: 16, height: 240, zIndex: 3 },
    { id: 7, img: img7, stackPos: 26, expandPos: 5, height: 200, zIndex: 2 },
  ];

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const element = document.querySelector(".imgs-animation");
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startPoint = windowHeight * 0.6;
    const endPoint = windowHeight * 0.1;
    const totalDistance = startPoint - endPoint;

    let progress = (startPoint - rect.top) / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let ticking = false;

    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", scrollListener);
  }, [handleScroll]);

  return (
    <div className="container">
      <div className="imgs-animation">
        <div className="imgs-container">
          {PRODUCTS.map((product) => {
            const currentLeft =
              product.stackPos +
              (product.expandPos - product.stackPos) * scrollProgress;
            const scale = 0.7 + 0.3 * scrollProgress;
            const opacity = 0.7 + 0.3 * scrollProgress;

            return (
              <img
                key={product.id}
                src={product.img}
                alt={`imgs-${product.id}`}
                className="imgs"
                loading="lazy"
                style={{
                  left: `${currentLeft}%`,
                  transform: `translateX(-50%) scale(${scale})`,
                  height: `${product.height}px`,
                  zIndex: product.zIndex,
                  opacity,
                  willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform, opacity' : 'auto',
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="imgs-info">
        <h3 className="imgs-info-title">{t("VALESCO")}</h3>
        <p className="imgs-info-text">{t("imgsDesc")}</p>

        <NavLink to={"/catalogProduct"} className="imgs-info-btn">{t("imgsBtn")}<MdArrowOutward /></NavLink>
      </div>
    </div>
  );
};

export default Imgs;