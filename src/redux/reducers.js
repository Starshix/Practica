const initialState = {
    products: [],
    cart: []
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        
        case 'ADD_ITEM':
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };
        
        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };
        
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };
        
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        
        default:
            return state;
    }
}