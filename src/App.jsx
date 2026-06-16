// import React, { lazy } from 'react'

// import { Route, Routes } from 'react-router-dom'
// import Layout from './components/layout/Layout'
// const Home = lazy(() => import('./pages/home/Home'))
// const About = lazy(() => import('./pages/about/About'))
// const Impact = lazy(() => import('./pages/impact/Impact'))
// const Culture = lazy(() => import('./pages/culture/Culture'))
// const News = lazy(() => import('./pages/news/News'))
// const Unical = lazy(() => import('./pages/unical/Unical'))
// const Benafits = lazy(() => import('./pages/benafits/Benafits'))
// const Oil = lazy(() => import('./pages/oil/Oil'))
// const Distrbut = lazy(() => import('./pages/distrbut/Distrbut'))
// const Publications = lazy(() => import('./pages/publications/Publications'))
// const Contact = lazy(() => import('./pages/contact/Contact'))
// const ChinaAuto = lazy(() => import('./pages/chinaAuto/ChinaAuto'))
// const ProductItem = lazy(() => import('./pages/productItem/ProductItem'))
// const SingleProduct = lazy(() => import('./pages/singleProduct/SingleProduct'))
// const Outlets = lazy(() => import('./pages/outlets/Outlets'))
// const CatalogProduct = lazy(() => import('./pages/catologProduct/CatalogProduct'))
// import { ToastContainer } from 'react-toastify'
// import Market from './pages/market/Market'
// import NewsSingle from './pages/newsSingle/NewsSingle'

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/news' element={<News />} />
//           <Route path='/impact' element={<Impact />} />
//           <Route path='/culture' element={<Culture />} />
//           <Route path='/unical' element={<Unical />} />
//           <Route path='/benafits' element={<Benafits />} />
//           <Route path='/oil' element={<Oil />} />
//           <Route path='/distrbut' element={<Distrbut />} />
//           <Route path='/public' element={<Publications />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/chinaAuto' element={<ChinaAuto />} />
//           <Route path='/categories/:id' element={<ProductItem />} />
//           <Route path='/singleProduct/:id' element={<SingleProduct />} />
//           <Route path='/outlets' element={<Outlets />} />
//           <Route path='/catalogProduct' element={<CatalogProduct />} />
//           <Route path='/market-pleace' element={<Market />} />
//           <Route path='/news-single/:id' element={<NewsSingle />} />
//         </Route>
//       </Routes>

//       <ToastContainer />
//     </>
//   )
// }

// export default App


import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Leazy from "./components/leazy/Leazy";
import { ToastContainer } from "react-toastify";
import BlogPage from "./pages/blogPage/BlogPage";
import ArticlePage from "./pages/blogPage/ArticlePage";

// Lazy pages
const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Impact = lazy(() => import("./pages/impact/Impact"));
const Culture = lazy(() => import("./pages/culture/Culture"));
const News = lazy(() => import("./pages/news/News"));
const Unical = lazy(() => import("./pages/unical/Unical"));
const Benafits = lazy(() => import("./pages/benafits/Benafits"));
const Oil = lazy(() => import("./pages/oil/Oil"));
const Distrbut = lazy(() => import("./pages/distrbut/Distrbut"));
const Publications = lazy(() => import("./pages/publications/Publications"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const ChinaAuto = lazy(() => import("./pages/chinaAuto/ChinaAuto"));
const ProductItem = lazy(() => import("./pages/productItem/ProductItem"));
const SingleProduct = lazy(() => import("./pages/singleProduct/SingleProduct"));
const Outlets = lazy(() => import("./pages/outlets/Outlets"));
const CatalogProduct = lazy(() => import("./pages/catologProduct/CatalogProduct"));
const Market = lazy(() => import("./pages/market/Market"));
const NewsSingle = lazy(() => import("./pages/newsSingle/NewsSingle"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<Leazy />}>
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route path="impact" element={<Impact />} />
            <Route path="culture" element={<Culture />} />
            <Route path="unical" element={<Unical />} />
            <Route path="benafits" element={<Benafits />} />
            <Route path="oil" element={<Oil />} />
            <Route path="distrbut" element={<Distrbut />} />
            <Route path="public" element={<Publications />} />
            <Route path="contact" element={<Contact />} />
            <Route path="chinaAuto" element={<ChinaAuto />} />
            <Route path="categories/:id" element={<ProductItem />} />
            <Route path="singleProduct/:id" element={<SingleProduct />} />
            <Route path="outlets" element={<Outlets />} />
            <Route path="catalogProduct" element={<CatalogProduct />} />
            <Route path="market-pleace" element={<Market />} />
            <Route path="news-single/:id" element={<NewsSingle />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer />
    </ErrorBoundary>
  );
};

export default App;