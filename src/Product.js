import "./Product.css";
import React from 'react';
import { useStateValue } from './StateProvider';

function Product({ id, title, price, rating, image }) {

    const [{ basket }, updateState] = useStateValue();

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

    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map(() => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>

            <img className="product__image" src={image} />

            <button className="product__button" onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product