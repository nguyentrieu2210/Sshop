import { BrowserRouter, Link, Routes, Route, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
//shared
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";
//pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Success from "./pages/Success";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { getCategories } from "./services/Api";
import { Provider } from "react-redux";
import store from "./redux-setup/store";

const App = () => {
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    getCategories({}).then(({ data }) => {
      setCategories(data.data.docs);
    });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <div id="body">
            <div className="container">
              <Menu categories={categories} />
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  <Slider />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Cart" element={<Cart/>} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Success" element={<Success />} />
                    <Route path="/ProductDetails-:id" element={<ProductDetails />} />
                    <Route path="/Category-:id" element={<Category />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App;