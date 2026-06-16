import React, { useEffect } from 'react'
import HeroTop from '../../components/heroTop/HeroTop'
import Hero from '../../components/hero/Hero'
import HeroBrand from '../../components/heroBrand/HeroBrand'
import ProductRange from '../../components/productRange/ProductRange'
import Banner from '../../components/banner/Banner'
import PrideArea from '../../components/prideArea/PrideArea'
import Differents from '../../components/differents/Differents'
import Leazy from '../../components/leazy/Leazy'
import Mission from '../../components/mission/Mission'
import CallTo from '../../components/callTo/CallTo'
import Imgs from '../../components/imgs/Imgs'
import Media from '../../components/media/Media'
import NewsCard from '../../components/newsCard/NewsCard'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Imgs />
      <ProductRange />
      <Banner />
      <PrideArea />
      <Differents />
      <NewsCard />
      {/* <Media/> */}
    </>
  )
}

export default Home