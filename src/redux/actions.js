export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        payload: products
    };
}

export function addItem(product) {
    return {
        type: ADD_ITEM,
        payload: product
    };
}

export function removeItem(productId) {
    return {
        type: REMOVE_ITEM,
        payload: productId
    };
}

export function updateQuantity(item) {
    return {
        type: UPDATE_QUANTITY,
        payload: item
    };
}

export function clearCart() {
    return {
        type: CLEAR_CART
    };
}