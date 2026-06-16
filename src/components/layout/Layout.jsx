import React, { useEffect, useState } from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import { IoMdArrowRoundUp } from 'react-icons/io'
import "./layout.scss"

const Layout = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

      {showTopBtn && (
        <div className='topMenus'>
          <button onClick={scrollToTop}>
            <IoMdArrowRoundUp />
          </button>
        </div>
      )}
    </div>
  )
}

export default Layout
