import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './market.scss'

const Market = () => {
    const [activeTab, setActiveTab] = useState('oil');
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='market container'>
            <h3 className="market-title">{t("Где купить")}</h3>

            <div className="market-place">

                <div className="market-place-content">
                    <div className={`tab-content ${activeTab === 'oil' ? 'active' : ''}`}>
                        <div className="marketplace-grid">

                            <a target='_blank' href="https://exzap.uz/brands/VALESCO">
                                <div className="marketplace-card-one">
                                    <div className="bottom-slide">{t("В магазин")}</div>
                                </div>
                            </a>

                            <a target='_blank' href="https://uzum.uz/uz/search?query=valesco&needsCorrection=1">
                                <div className="marketplace-card-two">
                                    <div className="bottom-slide">{t("В магазин")}</div>
                                </div>
                            </a>

                            <a target='_blank' href="https://uz.ozon.com/search/?from_global=true&text=valesco+%D0%BC%D0%B0%D1%81%D0%BB%D0%BE">
                                <div className="marketplace-card-three">
                                    <div className="bottom-slide">{t("В магазин")}</div>
                                </div>
                            </a>

                            <a target='_blank' href="https://market.yandex.ru/search?text=valesco%20masla&hid=90478&hid=90479&hid=90480&rs=eJwz6mFU8ubiLUvMSS1OzlfITSzOSRQ49ughsxILB4MAO5hkgJAaDFmo6qo4TA2MLMxNjSwbGN8eYu1iZOJgqGLheHeIdQMjwydGGaCmhYdYJRgUgCIK74H4wyFWDSCtAeT_ZXy_9YNdL1PxZ1P7qUyPoxXsVzABhQFH0C4E&rt=11&glfilter=7893318%3A50287529">
                                <div className="marketplace-card-four">
                                    <div className="bottom-slide">{t("В магазин")}</div>
                                </div>
                            </a>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Market
