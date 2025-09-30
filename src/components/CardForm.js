import React, { useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask';

const CardForm = ({ setCardData, values }) => {
    const [cardNumber, setCardNumber] = useState(values.cardNumber || '');
    const [cardName, setCardName] = useState(values.cardName || '');
    const [cardMonth, setCardMonth] = useState(values.cardMonth || '');
    const [cardYear, setCardYear] = useState(values.cardYear || '');
    const [cardCvv, setCardCvv] = useState(values.cardCvv || '');

    const minCardYear = new Date().getFullYear();

    useEffect(() => {
        setCardData({
            cardNumber: cardNumber,
            cardName: cardName,
            cardMonth: cardMonth,
            cardYear: cardYear,
            cardCvv: cardCvv
        });
    }, [cardNumber, cardName, cardMonth, cardYear, cardCvv, setCardData]);

    const getCardType = () => {
        const number = cardNumber.replace(/\s/g, '');
        if (/^4/.test(number)) return "visa";
        if (/^(34|37)/.test(number)) return "amex";
        if (/^5[1-5]/.test(number)) return "mastercard";
        if (/^6011/.test(number)) return "discover";
        if (/^9792/.test(number)) return 'troy';
        return "visa";
    };

    const generateCardNumberMask = () => {
        const cardType = getCardType();
        return cardType === "amex" ? "#### ###### #####" : "#### #### #### ####";
    };

    const getCardNumberMask = () => {
        const maskString = generateCardNumberMask();
        return maskString.split('').map(char => (char === '#' ? /\d/ : char));
    };

    const getCvvMask = () => {
        const cardType = getCardType();
        return cardType === "amex" ? [/\d/, /\d/, /\d/, /\d/] : [/\d/, /\d/, /\d/];
    };

    const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return {
            value: month < 10 ? `0${month}` : `${month}`,
            label: month < 10 ? `0${month}` : `${month}`,
            disabled: month < (cardYear === minCardYear ? new Date().getMonth() + 1 : 1)
        };
    });

    const years = Array.from({ length: 12 }, (_, i) => minCardYear + i);

    return (
        <div className="card-form">
            <div className="card-form__header">
                <h3>Данные банковской карты</h3>
                <p>Введите данные вашей карты для оплаты</p>
            </div>
            
            <div className="card-form__content">
                <div className="form-group">
                    <label htmlFor="cardNumber" className="form-label">
                        Номер карты
                    </label>
                    <MaskedInput
                        type="text"
                        id="cardNumber"
                        className="form-input"
                        mask={getCardNumberMask()}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        autoComplete="cc-number"
                        required
                        placeholder="1234 5678 9012 3456"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cardName" className="form-label">
                        Имя держателя карты
                    </label>
                    <input
                        type="text"
                        id="cardName"
                        className="form-input"
                        value={cardName}
                        required
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        autoComplete="cc-name"
                        placeholder="IVAN IVANOV"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            Срок действия
                        </label>
                        <div className="form-select-group">
                            <select
                                className="form-select"
                                value={cardMonth}
                                required
                                onChange={(e) => setCardMonth(e.target.value)}
                            >
                                <option value="">Месяц</option>
                                {months.map(month => (
                                    <option 
                                        key={month.value} 
                                        value={month.value}
                                        disabled={month.disabled}
                                    >
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="form-select"
                                value={cardYear}
                                required
                                onChange={(e) => setCardYear(e.target.value)}
                            >
                                <option value="">Год</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardCvv" className="form-label">
                            CVV код
                        </label>
                        <MaskedInput
                            type="text"
                            className="form-input"
                            id="cardCvv"
                            mask={getCvvMask()}
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            autoComplete="cc-csc"
                            placeholder="123"
                        />
                        <div className="cvv-hint">
                            <span className="cvv-icon">🔒</span>
                            3 цифры на обратной стороне карты
                        </div>
                    </div>
                </div>

                <div className="security-notice">
                    <div className="security-icon">🛡️</div>
                    <div className="security-text">
                        <strong>Безопасность платежей</strong>
                        <span>Все данные защищены SSL-шифрованием</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardForm;