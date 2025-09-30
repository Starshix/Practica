import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import { NotFound } from './components/NotFound';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<OrderForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
};

export default App;