import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as thunks from '../redux/thunks.js';
import ProductItem from './ProductItem';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const [sortBy, setSortBy] = useState('title');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(thunks.getProducts());
    }, [dispatch]);

    // Получаем уникальные категории из продуктов
    const categories = [...new Set(products.map(product => product.category))];

    const sortedProducts = useCallback(() => {
        const sortMultiplier = sortBy === 'price'
            ? (a, b) => a.price - b.price
            : sortBy === 'price-desc'
            ? (a, b) => b.price - a.price
            : (a, b) => a.title.localeCompare(b.title);

        return [...products].sort(sortMultiplier);
    }, [products, sortBy]);

    const filteredProducts = useCallback(() => {
        let filtered = sortedProducts();

        if (minPrice !== '') {
            filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
        }

        if (maxPrice !== '') {
            filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
        }

        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        return filtered;
    }, [sortedProducts, minPrice, maxPrice, category]);

    if (!products || products.length === 0) {
        return (
            <div className="container_katalog">
                <h2>Загрузка товаров...</h2>
            </div>
        );
    }

    return (
        <div className="container_katalog">
            <div className="katalog_header">
                <h1>КАТАЛОГ АВТОЗАПЧАСТЕЙ</h1>
                <p>Широкий выбор качественных запчастей для вашего автомобиля</p>
            </div>

            <div className="katalog_content">
                <div className="filters_sidebar">
                    <div className="filter_section">
                        <h3>Сортировка</h3>
                        <div className="filter_buttons">
                            <button 
                                className={`filter_btn ${sortBy === 'title' ? 'active' : ''}`}
                                onClick={() => setSortBy('title')}
                            >
                                По названию
                            </button>
                            <button 
                                className={`filter_btn ${sortBy === 'price' ? 'active' : ''}`}
                                onClick={() => setSortBy('price')}
                            >
                                По цене (возр.)
                            </button>
                            <button 
                                className={`filter_btn ${sortBy === 'price-desc' ? 'active' : ''}`}
                                onClick={() => setSortBy('price-desc')}
                            >
                                По цене (убыв.)
                            </button>
                        </div>
                    </div>

                    <div className="filter_section">
                        <h3>Цена, ₽</h3>
                        <div className="price_inputs">
                            <div className="price_input_group">
                                <label>От</label>
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="price_input_group">
                                <label>До</label>
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="100000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter_section">
                        <h3>Категории</h3>
                        <div className="category_buttons">
                            <button 
                                className={`category_btn ${category === '' ? 'active' : ''}`}
                                onClick={() => setCategory('')}
                            >
                                Все категории
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`category_btn ${category === cat ? 'active' : ''}`}
                                    onClick={() => setCategory(cat)}
                                >
                                    {cat === 'rem' && 'Ремкомплекты'}
                                    {cat === 'gyr' && 'Рулевое управление'}
                                    {cat === 'brich' && 'Тормозная система'}
                                    {cat === 'niva' && 'Для Нивы'}
                                    {cat === 'enj' && 'Двигатель'}
                                    {!['rem', 'gyr', 'brich', 'niva', 'enj'].includes(cat) && cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter_section">
                        <button 
                            className="reset_filters"
                            onClick={() => {
                                setSortBy('title');
                                setMinPrice('');
                                setMaxPrice('');
                                setCategory('');
                            }}
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>

                <div className="products_main">
                    <div className="products_header">
                        <h2>Запчасти ({filteredProducts().length})</h2>
                        <div className="sort_indicator">
                            {sortBy === 'title' && 'Сортировка: По названию'}
                            {sortBy === 'price' && 'Сортировка: По цене (возрастание)'}
                            {sortBy === 'price-desc' && 'Сортировка: По цене (убывание)'}
                        </div>
                    </div>

                    <div className="product_grid">
                        {filteredProducts().map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts().length === 0 && (
                        <div className="no_products">
                            <h3>Товары не найдены</h3>
                            <p>Попробуйте изменить параметры фильтрации</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;