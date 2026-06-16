import React, { useEffect, useRef } from "react";
import "./productRange.scss";
import { NavLink } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import { useTranslation } from "react-i18next";
import CatalogLoading from "../catalogLoading/CatalogLoading";

import rs1 from "../../assets/icon/v1.webp"
import rs2 from "../../assets/icon/v1-1.webp"
import rs3 from "../../assets/icon/v2.webp"
import rs4 from "../../assets/icon/v2-1.webp"
import rs5 from "../../assets/icon/v3.webp"
import rs6 from "../../assets/icon/v3-1.webp"
import rs7 from "../../assets/icon/v4.webp"
import rs8 from "../../assets/icon/v4-1.webp"
import rs9 from "../../assets/icon/v5.webp"
import rs10 from "../../assets/icon/v5-1.webp"
import rs11 from "../../assets/icon/v6.webp"
import rs12 from "../../assets/icon/v6-1.webp"
import rs13 from "../../assets/icon/v7.webp"
import rs14 from "../../assets/icon/v7-1.webp"
import rs15 from "../../assets/icon/v8.webp"
import rs16 from "../../assets/icon/v8-1.webp"
import file from "../../assets/pdf/v-catalog.pdf"

const CATEGORY = [
  {
    image: rs13,
    bgImage: rs14,
  },
  {
    image: rs1,
    bgImage: rs2,
  },
  {
    image: rs3,
    bgImage: rs4,
  },
  {
    image: rs7,
    bgImage: rs8,
  },
  {
    image: rs11,
    bgImage: rs12,
  },
  {
    image: rs5,
    bgImage: rs6,
  },
  {
    image: rs9,
    bgImage: rs10,
  },
  {
    image: rs15,
    bgImage: rs16,
  }
];

const ProductRange = ({ hide }) => {
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);
  const bgRefs = useRef([]);
  const { t, i18n } = useTranslation()

  const { data, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (!data) return;
    const RANGE = 20;

    const handleMouseMove = (event, card, img, bg) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const xValue = ((x / rect.width) * RANGE - RANGE / 2).toFixed(1);
      const yValue = ((y / rect.height) * RANGE - RANGE / 2).toFixed(1);

      card.style.transform = `rotateX(${-yValue}deg) rotateY(${xValue}deg)`;

      if (img) {
        img.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
      }

      if (bg) {
        bg.style.backgroundPosition = `${xValue * 1.5}px ${-yValue * 1.5}px`;
      }
    };

    const handleMouseLeave = (card, img, bg) => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      if (img) img.style.transform = `translateX(0) translateY(0)`;
      if (bg) bg.style.backgroundPosition = `center`;
    };

    const listeners = [];

    cardRefs.current.forEach((card, index) => {
      const img = imgRefs.current[index];
      const bg = bgRefs.current[index];
      if (!card) return;

      const moveHandler = (e) => handleMouseMove(e, card, img, bg);
      const leaveHandler = () => handleMouseLeave(card, img, bg);

      card.addEventListener("mousemove", moveHandler);
      card.addEventListener("mouseleave", leaveHandler);

      listeners.push({ card, moveHandler, leaveHandler });
    });

    return () => {
      listeners.forEach(({ card, moveHandler, leaveHandler }) => {
        if (card) {
          card.removeEventListener("mousemove", moveHandler);
          card.removeEventListener("mouseleave", leaveHandler);
        }
      });
    };

  }, [data]);

  return (
    <div className="productRange container">
      <div className={`productRange__container ${hide === true ? "productRange__container-hide" : ""}`}>
        {!hide && (
          <div className="productRange__info">
            <h1 className="productRange__info-title">{t("линейка")}</h1>
            <h3 className="productRange__info-text">
              {t("России много")}
            </h3>
            <p className="productRange__info-desc">
              {t("Воспользуйтесь нашим")}
            </p>
            <a href={file} download className="productRange__info-btn">
              {t("ctdw")} <MdArrowOutward />
            </a>
          </div>
        )}

        {isLoading ? (
          <CatalogLoading />
        ) : (
          <div className="productRange-card-list">
            {data?.map((item, index) => {
              const category = CATEGORY[index];
              return (
                <div key={item.id} className="productRange-card" ref={(el) => (cardRefs.current[index] = el)}>
                  <NavLink to={`/categories/${item?.id}`}>
                    <div className="productRange-card-bg" ref={(el) => (bgRefs.current[index] = el)} style={{ backgroundImage: `url(${category?.bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} />
                    <div className="overlay" />
                    <div className="productRange-card-img" ref={(el) => (imgRefs.current[index] = el)}>
                      <img src={category?.image} alt={item.title} />
                    </div>

                    <div className="productRange-card-content">
                      {
                        i18n?.languages[0] === "ru"
                          ?
                          <h4>{item.title?.ru}</h4>
                          :
                          <h4>{item.title?.en}</h4>
                      }
                    </div>

                  </NavLink>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRange;