import React, { useState, useCallback } from 'react';
import MapComponent from './MapComponent';

const Step3 = ({ prevStep, handleSubmit, values, currentStep }) => {
    const [address, setAddress] = useState(values.address || '');

    const handleAddressChange = useCallback((newAddress) => {
        setAddress(newAddress);
    }, []);

    return (
        <div className="order-container">
            {/* Progress Bar */}
            <div className="order-progress">
                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Данные покупателя</div>
                </div>
                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Оплата</div>
                </div>
                <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Доставка</div>
                </div>
            </div>

            <div className="order-step">
                <h2>Адрес доставки</h2>
                <div className="info_map">
                    <label>
                        Адрес доставки:
                        <input
                            type="text"
                            name="address"
                            value={address}
                            readOnly
                            placeholder="Выберите адрес на карте"
                        />
                    </label>
                    
                    <div className="map-container">
                        <MapComponent handleInputChange={handleAddressChange} />
                    </div>

                    <div className="delivery-info">
                        <h3>Информация о доставке</h3>
                        <div className="delivery-features">
                            <div className="delivery-feature">
                                <span className="feature-icon">🚚</span>
                                <span>Бесплатная доставка при заказе от 5 000 ₽</span>
                            </div>
                            <div className="delivery-feature">
                                <span className="feature-icon">⏱️</span>
                                <span>Срок доставки: 1-3 рабочих дня</span>
                            </div>
                            <div className="delivery-feature">
                                <span className="feature-icon">📦</span>
                                <span>Курьерская доставка до двери</span>
                            </div>
                        </div>
                    </div>

                    <div className="step-navigation">
                        <button type="button" onClick={prevStep} className="btn-secondary">
                            Назад
                        </button>
                        <button type="button" onClick={handleSubmit} className="btn-primary">
                            Завершить оформление
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3;