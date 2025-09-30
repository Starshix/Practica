import React from 'react';
import { Link } from 'react-router-dom';
import wk from '../../assets/images/wk.svg';
import tg from '../../assets/images/tg.svg';
import inst from '../../assets/images/inst.svg';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-column">
                        <p className="footer-description">
                            Интернет-магазин качественных автозапчастей для вашего автомобиля. 
                            Широкий ассортимент, гарантия качества и быстрая доставка по всей России.
                        </p>
                        <div className="social-links">
                            <p>Мы в социальных сетях:</p>
                            <div className="social-icons">
                                <Link href="#" className="social-link" aria-label="Telegram">
                                    <img src={tg} alt="Telegram" />
                                </Link>
                                <Link href="#" className="social-link" aria-label="VKontakte">
                                    <img src={wk} alt="VKontakte" />
                                </Link>
                                <Link href="#" className="social-link" aria-label="Instagram">
                                    <img src={inst} alt="Instagram" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-title">Навигация</h3>
                        <nav className="footer-nav">
                            <Link to="/" className="footer-link">Главная</Link>
                            <Link to="/products" className="footer-link">Каталог запчастей</Link>
                        </nav>
                    </div>

                    {/* Колонка с категориями */}
                    <div className="footer-column">
                        <h3 className="footer-title">Категории</h3>
                        <nav className="footer-nav">
                            <Link to="/products?category=rem" className="footer-link">Ремкомплекты</Link>
                            <Link to="/products?category=gyr" className="footer-link">Рулевое управление</Link>
                            <Link to="/products?category=brich" className="footer-link">Тормозная система</Link>
                            <Link to="/products?category=niva" className="footer-link">Для Нивы</Link>
                            <Link to="/products?category=enj" className="footer-link">Двигатель</Link>
                        </nav>
                    </div>

                    {/* Колонка с контактами */}
                    <div className="footer-column">
                        <h3 className="footer-title">Контакты</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <p className="contact-label">Телефон</p>
                                    <p className="contact-value">+7 (800) 200-08-73</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">✉️</span>
                                <div>
                                    <p className="contact-label">Email</p>
                                    <p className="contact-value">info@autoparts.ru</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">🕒</span>
                                <div>
                                    <p className="contact-label">Время работы</p>
                                    <p className="contact-value">Пн-Пт: 9:00-18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © 2025 AutoParts. Все права защищены.
                        </p>
                        <div className="footer-bottom-links">
                            <Link to="#" className="footer-bottom-link">Политика конфиденциальности</Link>
                            <Link to="#" className="footer-bottom-link">Условия использования</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};