import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions.js';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    if (!products || products.length === 0) {
        return (
            <div className="product-details-loading">
                <h2>Загрузка информации...</h2>
            </div>
        );
    }

    const product = products.find(product => product.id === parseInt(id));

    if (!product) {
        return (
            <div className="product-details-not-found">
                <h2>Товар не найден</h2>
                <button onClick={() => navigate('/products')}>Вернуться в каталог</button>
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch(actions.addItem(product));
    };

    const handleBuyNow = () => {
        dispatch(actions.addItem(product));
        navigate('/cart');
    };

    const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);

    return (
        <div className="product-details">
            <div className="product-details-container">
                <div className="breadcrumbs">
                    <button onClick={() => navigate('/')}>Главная</button>
                    <span> / </span>
                    <button onClick={() => navigate('/products')}>Каталог</button>
                    <span> / </span>
                    <span>{product.title}</span>
                </div>

                <div className="product-details-content">
                    <div className="product-image-section">
                        <div className="main-image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        {product.new && <span className="product-badge new">Новинка</span>}
                        {product.top && <span className="product-badge top">Топ продаж</span>}
                    </div>

                    <div className="product-info-section">
                        <div className="product-category">
                            {product.category === 'rem' && 'Ремкомплект'}
                            {product.category === 'gyr' && 'Рулевое управление'}
                            {product.category === 'brich' && 'Тормозная система'}
                            {product.category === 'niva' && 'Для Нивы'}
                            {product.category === 'enj' && 'Двигатель'}
                        </div>

                        <h1 className="product-title_p">{product.title}</h1>

                        <div className="product-rating">
                            <div className="stars">
                                {'★'.repeat(Math.floor(product.rating?.rate || 0))}
                                {'☆'.repeat(5 - Math.floor(product.rating?.rate || 0))}
                            </div>
                            <span className="rating-count">({product.rating?.count || 0} отзывов)</span>
                        </div>

                        <div className="product-price-section">
                            <div className="price">{formattedPrice} ₽</div>
                            <div className="price-note">Включая НДС</div>
                        </div>

                        <div className="product-actions">
                            <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                <span className="cart-icon">🛒</span>
                                Добавить в корзину
                            </button>
                            <button className="btn-buy-now" onClick={handleBuyNow}>
                                Купить сейчас
                            </button>
                        </div>

                        <div className="product-features">
                            <div className="feature">
                                <span className="feature-icon">🚚</span>
                                <div className="feature-text">
                                    <strong>Бесплатная доставка</strong>
                                    <span>При заказе от 5000 ₽</span>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">🔧</span>
                                <div className="feature-text">
                                    <strong>Гарантия качества</strong>
                                    <span>12 месяцев</span>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">⏱️</span>
                                <div className="feature-text">
                                    <strong>Доставка</strong>
                                    <span>1-3 рабочих дня</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-description-section">
                    <h2>Описание товара</h2>
                    <div className="description-content">
                        <p>{product.description}</p>
                        
                        <div className="specifications">
                            <h3>Характеристики</h3>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <span className="spec-label">Категория:</span>
                                    <span className="spec-value">
                                        {product.category === 'rem' && 'Ремкомплект'}
                                        {product.category === 'gyr' && 'Рулевое управление'}
                                        {product.category === 'brich' && 'Тормозная система'}
                                        {product.category === 'niva' && 'Для Нивы'}
                                        {product.category === 'enj' && 'Двигатель'}
                                    </span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Артикул:</span>
                                    <span className="spec-value">#{product.id}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Статус:</span>
                                    <span className="spec-value">
                                        {product.new ? 'Новинка' : 'В наличии'}
                                    </span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Рейтинг:</span>
                                    <span className="spec-value">{product.rating?.rate || 0}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;