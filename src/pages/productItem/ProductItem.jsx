import React, { useEffect } from 'react'
import "./productItem.scss"
import { useParams } from 'react-router-dom'
import { useGetCategoriesByIdQuery } from '../../context/api/categoryApi'
import Product from '../../components/product/Product'
import { useTranslation } from 'react-i18next'

const ProductItem = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetCategoriesByIdQuery(id)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const text = i18n?.languages[0] === "ru" ? data?.title?.ru : data?.title?.en

    return (
        <>
            <Product data={data?.products} loading={isLoading} title={text} />
        </>
    )
}

export default ProductItem