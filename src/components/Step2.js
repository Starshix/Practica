import React from 'react';
import CardForm from './CardForm';
import CardList from './CardList';

const Step2 = ({ prevStep, nextStep, setCardData, cardData, values, currentStep }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

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
                <h2>Способ оплаты</h2>
                <div className="card-form">
                    <CardList
                        cardNumber={cardData.cardNumber}
                        cardName={cardData.cardName}
                        cardMonth={cardData.cardMonth}
                        cardYear={cardData.cardYear}
                    />
                    <CardForm setCardData={setCardData} values={values} />
                </div>
                <div className="step-navigation">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                        Назад
                    </button>
                    <button type="button" onClick={handleSubmit} className="btn-primary">
                        Продолжить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2;