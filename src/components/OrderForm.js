import React, { useState, useCallback, useMemo } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const OrderForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    // Используем useCallback для memoization функции handleInputChange
    const handleInputChange = useCallback((name, value) => {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }, []);

    // Используем useCallback для memoization функции setCardData
    const setCardData = useCallback((cardData) => {
        setFormData(prevFormData => ({ ...prevFormData, ...cardData }));
    }, []);


    const handleSubmit = () => {
        // Обработка отправки данных
        console.log('Данные формы:', formData);
        alert('Форма отправлена!');
    };

    const memoizedValue = useMemo(() => ({
      cardNumber: formData.cardNumber,
      cardName: formData.cardName,
      cardMonth: formData.cardMonth,
      cardYear: formData.cardYear
    }), [formData.cardNumber, formData.cardName, formData.cardMonth, formData.cardYear]);


    switch (step) {
        case 1:
            return (
                <Step1
                    nextStep={nextStep}
                    handleInputChange={handleInputChange}
                    values={formData}
                />
            );
        case 2:
            return (
                <Step2
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setCardData={setCardData}
                    cardData={memoizedValue}
                    values={formData}
                />
            );
        case 3:
            return (
                <Step3
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                    values={formData}
                />
            );
        default:
            return null;
    }
};

export default OrderForm;