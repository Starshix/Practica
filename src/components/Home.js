import React, { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as thunks from '../redux/thunks.js';
import ProductItem from './ProductItem';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroImages = [
        "https://autogur73.ru/images/abt__ut2/banners/all/31/2577587112.webp",
        "https://autogur73.ru/images/abt__ut2/banners/all/31/1688814496.webp",
        "https://autogur73.ru/images/abt__ut2/banners/all/31/921899033.webp",
        "https://autogur73.ru/images/abt__ut2/banners/all/31/4025138149.webp"
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, [heroImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    }, [heroImages.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div class="slider">
            <div className="hero-slider">
                <div className="hero-slider-track">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ))}
                </div>
                <button
                    className="hero-slider-btn hero-slider-prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    ‹
                </button>
                <button
                    className="hero-slider-btn hero-slider-next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    ›
                </button>
                <div className="hero-slider-dots">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-slider-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductsSlider = ({ products, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef(null);

    const itemsPerView = 4;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) =>
            prev >= Math.ceil(products.length / itemsPerView) - 1 ? 0 : prev + 1
        );
    }, [products.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.ceil(products.length / itemsPerView) - 1 : prev - 1
        );
    }, [products.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches ? e.touches[0].clientX : e.clientX);
        setTranslateX(0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);

        if (translateX > 50) {
            prevSlide();
        } else if (translateX < -50) {
            nextSlide();
        }

        setTranslateX(0);
    };

    const productGroups = useMemo(() => {
        const groups = [];
        for (let i = 0; i < products.length; i += itemsPerView) {
            groups.push(products.slice(i, i + itemsPerView));
        }
        return groups;
    }, [products]);

    if (!products.length) return null;

    return (
        <div className="products-slider-section">
            <h2>{title}</h2>
            <div className="slider-container">
                <div
                    className="slider"
                    ref={sliderRef}
                    onMouseDown={handleTouchStart}
                    onMouseMove={handleTouchMove}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <div
                        className="slider-track"
                        style={{
                            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease'
                        }}
                    >
                        {productGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="slide-group">
                                {group.map(product => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </div>
                        ))}
                    </div>

                    {productGroups.length > 1 && (
                        <>
                            <button
                                className="slider-btn slider-btn-prev"
                                onClick={prevSlide}
                                aria-label="Previous slide"
                            >
                                ‹
                            </button>
                            <button
                                className="slider-btn slider-btn-next"
                                onClick={nextSlide}
                                aria-label="Next slide"
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>

                {productGroups.length > 1 && (
                    <div className="slider-dots">
                        {productGroups.map((_, index) => (
                            <button
                                key={index}
                                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(thunks.getProducts());
    }, [dispatch]);

    const newProducts = useMemo(() => {
        return products ? products.filter(product => product.new === true) : [];
    }, [products]);

    const topSalesProducts = useMemo(() => {
        return products ? products.filter(product => product.top === true) : [];
    }, [products]);

    return (
        <div className="container_home">
            <HeroSlider />
            <div className="container_home_inner">
                <div className="clothes">
                    <p className="clothes_p">
                        НАЙДИТЕ ДЕТАЛИ, ИДЕАЛЬНО ПОДХОДЯЩИЕ ДЛЯ ВАШЕГО АВТОМОБИЛЯ
                    </p>
                    <p className="clothes_p2">
                        Ознакомьтесь с нашим широким ассортиментом качественных автозапчастей, которые обеспечат надежность вашего автомобиля и удовлетворят все ваши потребности в ремонте и обслуживании.
                    </p>
                    <Link to="/products">
                        <button>
                            Каталог запчастей
                        </button>
                    </Link>

                    <div className="clothes_prem">
                        <div className="clothes_prem_1">
                            <p className="clothes_prem_p1">
                                200+
                            </p>
                            <p className="clothes_prem_p2">
                                Брендов автозапчастей
                            </p>
                        </div>
                        <div className="clothes_prem_2"></div>
                        <div className="clothes_prem_1">
                            <p className="clothes_prem_p1">
                                2,000+
                            </p>
                            <p className="clothes_prem_p2">
                                Высококачественных деталей
                            </p>
                        </div>
                        <div className="clothes_prem_2"></div>
                        <div className="clothes_prem_1">
                            <p className="clothes_prem_p1">
                                30,000+
                            </p>
                            <p className="clothes_prem_p2">
                                Довольные клиенты
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products_new">
                <ProductsSlider
                    products={newProducts}
                    title="Новинки автозапчастей"
                />

                <ProductsSlider
                    products={topSalesProducts}
                    title="Популярные запчасти"
                />
            </div>
        </div>
    );
};