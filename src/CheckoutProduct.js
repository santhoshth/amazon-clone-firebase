import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, price, rating, image, orderPageButton }) {

    const buttonType = orderPageButton == true ? "Buy it again" : "Delete";
    const [{ basket }, updateState] = useStateValue();

    const deleteFromBasket = () => {
        updateState({
            type: 'DELETE_FROM_BASKET',
            id: id,
        })
        console.log(`DELETE FROM CART --- ${title}`);
    }

    const addToCart = () => {
        // add the item into the data layer
        updateState({
            type: 'ADD_TO_BASKET',
            items: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            }
        })
        console.log(`ADDED TO CART AGAIN --- ${title}`);
    }

    const onClickType = orderPageButton == true ? addToCart : deleteFromBasket;

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map(() => (
                        <p>⭐</p>
                    ))}
                </div>

                <button className="checkoutProduct__button" onClick={onClickType}>{buttonType}</button>

            </div>
        </div>
    )
}

export default CheckoutProduct