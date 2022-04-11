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
        default:
            return state;
    }
};

export default reducer;