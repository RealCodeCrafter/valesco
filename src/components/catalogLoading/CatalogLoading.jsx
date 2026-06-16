import React from 'react'
import "./catalogLoading.scss"

const CatalogLoading = () => {
    return (
        <div className="catalog-loading">
            <div className="catalog-loading__wrapper">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div className="catalog-loading__item" key={index}>
                        <div className="catalog-loading__img bg__animation"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CatalogLoading