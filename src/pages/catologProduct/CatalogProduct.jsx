import React, { useEffect, useState } from 'react'
import ProductRange from '../../components/productRange/ProductRange'

const CatalogProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <ProductRange hide={true} />
    </div>
  )
}

export default CatalogProduct