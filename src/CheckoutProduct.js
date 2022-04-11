import React from 'react'
import './CheckoutProduct.css';

function CheckoutProduct({ id, title, price, rating, image }) {
    return (
        <div className="checkoutProduct">
            <div className="checkoutProduct__left">
                <img className="checkoutProduct__image" src={image} />
            </div>
            <div className="checkoutProduct__right">
                <div className="checkoutProduct__info">
                    <p>{title}</p>
                    <p className="checkoutProduct__price">
                        <small>₹</small>
                        <strong>{price}</strong>
                    </p>
                    <div className="checkoutProduct__rating">
                        {Array(rating).fill().map((_, i) => (
                            <p>⭐</p>
                        ))}
                    </div>
                    <button className="checkoutProduct__button" >Remove from Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct