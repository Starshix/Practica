import * as api from '../api.js';
import * as actions from './actions.js';

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const response = await api.getProductList();
            dispatch(actions.setProducts(response.productsData));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
};