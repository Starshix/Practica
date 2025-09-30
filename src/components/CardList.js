import React from 'react';
import chip from '../../assets/images/chip.png';
import visa from '../../assets/images/visa.png';

const CardList = React.memo(function CardList({ cardNumber, cardName, cardMonth, cardYear }) {
    // Форматирование номера карты
    const formatCardNumber = (number) => {
        if (!number) return '•••• •••• •••• ••••';
        const cleaned = number.replace(/\s/g, '');
        const parts = cleaned.match(/.{1,4}/g);
        return parts ? parts.join(' ') : '•••• •••• •••• ••••';
    };

    const maskedCardNumber = formatCardNumber(cardNumber);
    const expiryDate = cardMonth && cardYear ? `${cardMonth}/${String(cardYear).slice(2,4)}` : '••/••';
    const displayName = cardName || 'ВАШЕ ИМЯ';

    // Определение типа карты
    const getCardType = () => {
        if (!cardNumber) return 'visa';
        const cleaned = cardNumber.replace(/\s/g, '');
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        if (/^(34|37)/.test(cleaned)) return 'amex';
        return 'visa';
    };

    const cardType = getCardType();

    return (
        <div className="card-preview">
            <div className="card-preview__header">
                <h3>Предпросмотр карты</h3>
            </div>
            <div className="credit-card">
                <div className="credit-card__front">
                    <div className="credit-card__background"></div>
                    <div className="credit-card__content">
                        <div className="credit-card__header">
                            <img src={chip} className="credit-card__chip" alt="Chip" />
                            <div className="credit-card__type">
                                <img 
                                    src={visa} 
                                    alt="Card Type" 
                                    className="credit-card__type-img" 
                                />
                            </div>
                        </div>
                        <div className="credit-card__number">
                            {maskedCardNumber}
                        </div>
                        <div className="credit-card__footer">
                            <div className="credit-card__holder">
                                <div className="credit-card__label">Держатель карты</div>
                                <div className="credit-card__name">{displayName}</div>
                            </div>
                            <div className="credit-card__expiry">
                                <div className="credit-card__label">Срок действия</div>
                                <div className="credit-card__date">{expiryDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CardList;