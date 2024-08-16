import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HomePage from './pages/HomePage';
import AdminPage from "./pages/AdminPage.jsx"
import ProductPage from "./pages/ProductPage.jsx";
import ScrollToTop from './components/ScrollToTop.jsx';
import AllProductsPage from "./pages/AllProductsPage.jsx"
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminSignUpPage from './pages/AdminSignUpPage.jsx';
import AdminUnAuthorized from './pages/AdminUnAuthorized.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout.jsx';
import "./styles/utility.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="products" element={<AllProductsPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin/signup' element={<AdminSignUpPage />} />
          <Route path='/admin/unauthorized' element={<AdminUnAuthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
