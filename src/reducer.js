export const initialState = {
    basket: [],
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

        default:
            return state;
    }
};

export default reducer;