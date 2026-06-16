import React, { useEffect, useState, useMemo, useCallback } from 'react'
import "./singleProduct.scss"
import Advantages from '../../components/advantages/Advantages'
import Packing from '../../components/packing/Packing'
import Specificat from '../../components/specificat/Specificat'
import Characterist from '../../components/characterist/Characterist'
import Document from '../../components/document/Document'
import { NavLink, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../context/api/productApi'
import SingleLoading from '../../components/singleLoading/SingleLoading'
import { useTranslation } from 'react-i18next'
import { useGetCategoriesByIdQuery } from '../../context/api/categoryApi'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const LightboxModal = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close" onClick={onClose}>✕</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} className="lightbox-img" />
            </div>
        </div>
    )
}

const ImageLoader = ({ src, alt, onClick, className, isActive }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const handleLoad = useCallback(() => setLoading(false), [])
    const handleError = useCallback(() => {
        setLoading(false)
        setError(true)
    }, [])

    return (
        <div className={`image-container ${className || ''}`} onClick={onClick}>
            {loading && (
                <div className="image-loading">
                    <div className="image-spinner"></div>
                </div>
            )}
            {error ? (
                <div className="image-error">
                    <span>⚠️</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`${loading ? 'loading' : ''} ${isActive ? 'active' : ''}`}
                />
            )}
        </div>
    )
}

const ProductSections = ({ byData, t }) => (
    <div className="single-dropdown">
        <ul className="single-dropdown-item container">
            <li className="single-dropdown-item-list"><a href="#specy">{t("Спецификации")}</a></li>
            <li className="single-dropdown-item-list"><a href="#characterist">{t("Характеристики")}</a></li>
            {byData?.documents?.length > 0 && (
                <li className="single-dropdown-item-list"><a href="#document">{t("Документация")}</a></li>
            )}
        </ul>

        <div className="single-dropdown-result">
            <Specificat data={byData?.specifications} />
            <Characterist data={byData} />
            {byData?.documents?.length > 0 && (
                <Document data={byData?.documents} />
            )}
        </div>
    </div>
)

const RelatedProductsCarousel = ({ products }) => (
    <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 }
        }}
        className="single-freezees container">
        {products?.map((el, index) => (
            <SwiperSlide key={el?.id || index} className='single-freezee'>
                <NavLink to={`/singleProduct/${el?.id}`}>
                    <div className="single-freezee-img">
                        <img src={el?.image?.[0] || el?.image?.[1]} alt={el?.title} />
                    </div>

                    <div className="single-freeze-item">
                        <p className="single-freezee-item-text">{el?.title}</p>
                    </div>
                </NavLink>
            </SwiperSlide>
        ))}
    </Swiper>
)

const SingleProduct = () => {
    const { t, i18n } = useTranslation()
    const { id } = useParams()
    const { data: byData, isLoading } = useGetProductByIdQuery(id)
    const [activeImg, setActiveImg] = useState(null)
    const [lightboxImg, setLightboxImg] = useState(null)

    const { data: Freezee } = useGetCategoriesByIdQuery(25)
    const { data: FILTER } = useGetCategoriesByIdQuery(28)
    const { data: BREAKE } = useGetCategoriesByIdQuery(12)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [id])

    useEffect(() => {
        if (byData?.image?.length > 0) {
            setActiveImg(byData.image[0])
        }
    }, [byData])

    const isOilCategory = useMemo(() => {
        const categoryTitleRu = byData?.category?.title?.ru
        const categoryTitleEn = byData?.category?.title?.en
        const oilCategories = [
            { ru: "Моторные масла для легковой и легкой коммерческой техники", en: "Motor oils for passenger cars and light commercial vehicles" },
            { ru: "Моторные масла для дизельных двигателей", en: "Motor oils for diesel engines" },
            { ru: "Трансмиссионные масла", en: "Transmission oils" },
            { ru: "Гидравлические масла", en: "Hydraulic oils" }
        ]

        return oilCategories.some(cat =>
            categoryTitleRu === cat.ru || categoryTitleEn === cat.en
        )

    }, [byData?.category])

    const relatedProducts = useMemo(() => {
        const categoryTitleRu = byData?.category?.title?.ru
        const categoryTitleEn = byData?.category?.title?.en
        if (categoryTitleRu === "Антифриз" || categoryTitleEn === "Antifreeze") return Freezee?.products
        if (categoryTitleRu === "Фильтры" || categoryTitleEn === "Filters") return FILTER?.products
        if (categoryTitleRu === "Тормозная жидкость" || categoryTitleEn === "Brake fluid") return BREAKE?.products
        return null
    }, [byData?.category, Freezee?.products, FILTER?.products, BREAKE?.products])

    const showFilterInfo = useMemo(() => {
        const categoryTitleRu = byData?.category?.title?.ru
        const categoryTitleEn = byData?.category?.title?.en
        return categoryTitleRu === "Фильтры" || categoryTitleEn === "Filters"
    }, [byData?.category])

    if (isLoading) {
        return (
            <div className='single'>
                <SingleLoading />
            </div>
        )
    }

    return (
        <div className='single'>
            <div className="single-top container">
                <div className="single-top-left">

                    <div className="single-top-left-bottom-imgs">
                        {byData?.image?.map((img, idx) => (
                            <ImageLoader
                                key={idx}
                                src={img}
                                alt={`product-${idx}`}
                                onClick={() => setActiveImg(img)}
                                className="thumb-img"
                                isActive={activeImg === img}
                            />
                        ))}
                    </div>

                    <div
                        className="single-top-left-img"
                        onClick={() => activeImg && setLightboxImg(activeImg)}
                        style={{ cursor: 'zoom-in' }}
                    >
                        {activeImg && (
                            <ImageLoader
                                src={activeImg}
                                alt="single img active"
                                className="main-img"
                            />
                        )}
                    </div>
                </div>

                <div className="single-top-right">
                    <h2 className="single-top-right-title">{byData?.title}</h2>
                    <p className="single-top-right-text">
                        {i18n?.language === "ru"
                            ? byData?.description_ru
                            : byData?.description_en
                        }
                    </p>

                    {showFilterInfo && (
                        <div className="info-card">
                            <div className="row">
                                <span className="label">MODEL</span>
                            </div>

                            <div className="row">
                                <span className="value">{byData?.kinematic_one?.[0]}</span>
                            </div>

                            <div className="row">
                                <span className="label">TYPE</span>
                            </div>

                            <div className="row">
                                <span className="value">{byData?.kinematic_two?.[0]}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isOilCategory && <ProductSections byData={byData} t={t} />}

            {relatedProducts && <RelatedProductsCarousel products={relatedProducts} />}

            {lightboxImg && (
                <LightboxModal
                    src={lightboxImg}
                    alt="product zoomed"
                    onClose={() => setLightboxImg(null)}
                />
            )}
        </div>
    )
}

export default SingleProduct