import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logo.webp';
import phone from '../../assets/images/phone.svg';

export const Header = () => {
    const cartItems = useSelector(state => state.cart);
    const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <header className="header">
            <div className="header-container">
                {/* Логотип и навигация */}
                <div className="header-main">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="AutoParts Logo" className="logo" />
                        </Link>
                    </div>

                    <nav className="main-nav">
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/products" className="nav-link">Каталог запчастей</Link>
                    </nav>
                </div>

                {/* Правая часть - корзина и контакты */}
                <div className="header-actions">
                    {/* Корзина */}
                    <Link to="/cart" className="cart-widget">
                        <div className="cart-icon-container">
                            <span className="cart-icon">🛒</span>
                            {cartItemsCount > 0 && (
                                <span className="cart-badge">{cartItemsCount}</span>
                            )}
                        </div>
                        <div className="cart-info">
                            <p className="cart-label">Корзина</p>
                            <p className="cart-total">
                                {cartItems.length > 0 
                                    ? `${cartItems.length} товар(а)` 
                                    : 'Пусто'
                                }
                            </p>
                        </div>
                    </Link>
                    <div className="contact-info">
                        <p className="contact-text">Есть вопросы, звоните в любое время</p>
                        <div className="phone-number">
                            <span>+7 (800) 200-08-73</span>
                            <img src={phone} alt="Phone" className="phone-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};