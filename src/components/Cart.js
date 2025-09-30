import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../redux/actions.js';

const Cart = () => {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const removeFromCart = (productId) => {
        dispatch(actions.removeItem(productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(actions.updateQuantity({ id: productId, quantity: newQuantity }));
    };

    const clearCart = () => {
        dispatch(actions.clearCart());
    };

    // Расчет общей суммы
    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);

    const formattedTotal = new Intl.NumberFormat('ru-RU').format(totalAmount);

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Ваша корзина пуста</h2>
                    <p>Добавьте товары из каталога, чтобы сделать заказ</p>
                    <Link to="/products" className="btn-continue-shopping">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Корзина товаров</h1>
                    <div className="cart-stats">
                        <span>{cartItems.length} товар(а)</span>
                        <button onClick={clearCart} className="btn-clear-cart">
                            Очистить корзину
                        </button>
                    </div>
                </div>

                <div className="cart-content">
                    <div className="cart-items-section">
                        {cartItems.map(item => {
                            const itemTotal = item.price * (item.quantity || 1);
                            const formattedItemTotal = new Intl.NumberFormat('ru-RU').format(itemTotal);
                            const formattedPrice = new Intl.NumberFormat('ru-RU').format(item.price);

                            return (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    
                                    <div className="cart-item-info">
                                        <h3 className="cart-item-title">{item.title}</h3>
                                        <div className="cart-item-category">
                                            {item.category === 'rem' && 'Ремкомплект'}
                                            {item.category === 'gyr' && 'Рулевое управление'}
                                            {item.category === 'brich' && 'Тормозная система'}
                                            {item.category === 'niva' && 'Для Нивы'}
                                            {item.category === 'enj' && 'Двигатель'}
                                        </div>
                                        <div className="cart-item-price">
                                            {formattedPrice} ₽ / шт.
                                        </div>
                                    </div>

                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-display">
                                                {item.quantity || 1}
                                            </span>
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        <div className="cart-item-total">
                                            {formattedItemTotal} ₽
                                        </div>
                                        
                                        <button 
                                            className="btn-remove-item"
                                            onClick={() => removeFromCart(item.id)}
                                            title="Удалить из корзины"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary-section">
                        <div className="order-summary">
                            <h3>Сводка заказа</h3>
                            
                            <div className="summary-row">
                                <span>Товары ({cartItems.length})</span>
                                <span>{formattedTotal} ₽</span>
                            </div>
                            
                            <div className="summary-row">
                                <span>Доставка</span>
                                <span className="free-shipping">Бесплатно</span>
                            </div>
                            
                            <div className="summary-divider"></div>
                            
                            <div className="summary-total">
                                <span>Итого</span>
                                <span className="total-amount">{formattedTotal} ₽</span>
                            </div>

                            <div className="shipping-notice">
                                <span className="shipping-icon">🚚</span>
                                Бесплатная доставка при заказе от 5 000 ₽
                            </div>

                            <Link to="/order" className="btn-checkout">
                                Перейти к оформлению
                            </Link>

                            <Link to="/products" className="btn-continue-shopping-secondary">
                                Продолжить покупки
                            </Link>
                        </div>

                        <div className="cart-benefits">
                            <div className="benefit-item">
                                <span className="benefit-icon">🛡️</span>
                                <div className="benefit-text">
                                    <strong>Гарантия качества</strong>
                                    <span>12 месяцев на все запчасти</span>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🚚</span>
                                <div className="benefit-text">
                                    <strong>Быстрая доставка</strong>
                                    <span>1-3 рабочих дня по России</span>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🔧</span>
                                <div className="benefit-text">
                                    <strong>Техподдержка</strong>
                                    <span>Помощь в подборе запчастей</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;