import React from 'react';
import MaskedInput from 'react-text-mask';

const Step1 = ({ nextStep, handleInputChange, values, currentStep }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    const phoneMask = [
        '+',
        '7',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
    ];

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
                <h2>Данные покупателя</h2>
                <form onSubmit={handleSubmit} className="info_sell">
                    <label>
                        Имя:
                        <input
                            type="text"
                            name="name"
                            required
                            value={values.name || ''}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            placeholder="Введите ваше имя"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            required
                            value={values.email || ''}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            placeholder="example@mail.ru"
                        />
                    </label>
                    <label>
                        Телефон:
                        <MaskedInput
                            mask={phoneMask}
                            name="tel"
                            className="form-input"
                            placeholder="+7 (___) ___-__-__"
                            required
                            value={values.tel || ''}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                    </label>
                    <div className="step-navigation">
                        <button type="submit" className="btn-primary">
                            Продолжить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Step1;