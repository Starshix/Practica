import productsData from './data/products.json';

export const getProductList = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ productsData });
            console.log(productsData)
        }, 500);
    });
};