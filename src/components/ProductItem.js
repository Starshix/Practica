

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions.js';
import { useNavigate } from 'react-router-dom';

const ProductItem = React.memo(({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = useCallback((event) => {
        event.stopPropagation();
        dispatch(actions.addItem(product));
    }, [dispatch, product]);

    const handleClick = useCallback(() => {
        navigate(`/product/${product.id}`);
    }, [navigate, product.id]);

    // Сокращаем длинное описание
    const shortDescription = product.description.length > 100 
        ? product.description.substring(0, 100) + '...' 
        : product.description;

    // Форматируем цену с пробелами
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);

    return (
        <div className="product-card">
            <div className="product-image-container" onClick={handleClick}>
                <img 
                    src={product.image} 
                    alt={product.title}
                    className="product-image"
                />
                {product.new && <span className="product-badge new">Новинка</span>}
                {product.top && <span className="product-badge top">Топ продаж</span>}
            </div>
            
            <div className="product-content" onClick={handleClick}>
                <div className="product-category">
                    {product.category === 'rem' && 'Ремкомплект'}
                    {product.category === 'gyr' && 'Рулевое управление'}
                    {product.category === 'brich' && 'Тормозная система'}
                    {product.category === 'niva' && 'Для Нивы'}
                    {product.category === 'enj' && 'Двигатель'}
                </div>
                
                <h3 className="product-title">{product.title}</h3>
                
                <p className="product-description" onClick={handleClick}>
                    {shortDescription}
                </p>
                
                <div className="product-rating">
                    <div className="stars">
                        {'★'.repeat(Math.floor(product.rating?.rate || 0))}
                        {'☆'.repeat(5 - Math.floor(product.rating?.rate || 0))}
                    </div>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                </div>
                
                <div className="product-footer">
                    <div className="product-price">
                        {formattedPrice} ₽
                    </div>
                    <button 
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        <span className="cart-icon">🛒</span>
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ProductItem;