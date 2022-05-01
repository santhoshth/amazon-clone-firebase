export const initialState = {
    basket: [],
    user: null,
};

export const getTotalPrice = (basket) => {
    if (basket.length > 0) {
        var amount = 0;
        basket.map((item) => amount += parseInt(item.price.replace(/,/g, '')));
        return amount;
    }
    return 0;
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.items],
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            }

        case 'DELETE_FROM_BASKET':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

            let newBasket = [...state.basket];
            if (index > -1) {
                newBasket.splice(index, 1);
            }

            return {
                ...state,
                basket: newBasket,
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };

        case 'SET_BASKET':
            return {
                ...state,
                basket: action.basket,
            };

        default:
            return state;
    }
};

export default reducer;