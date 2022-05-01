import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from './firebase';


function CheckoutProduct({ id, title, price, rating, image, orderPageButton }) {

    const buttonType = orderPageButton == true ? "Buy it again" : "Delete";
    const [{ basket, user }, updateState] = useStateValue();

    const toDo = async () => {
        const item = {
            id: id,
            title: title,
            price: price,
            rating: rating,
            image: image,
        };

        // ----------------------comment this out before deploy 1--------------------------
        // In the firestore db access the users collection
        const userCollection = collection(db, "users");

        // In the user collection reach to document of specific user id
        const userDoc = doc(userCollection, user?.uid);

        const cartCollection = collection(userDoc, "basket");

        const cartDoc = doc(cartCollection, "basketItems");

        let newBasket = basket;
        // ----------------------comment this out before deploy 1--------------------------

        if (orderPageButton) {
            await updateState({
                type: 'ADD_TO_BASKET',
                items: item
            })
            // ----------------------comment this out before deploy 2--------------------------
            newBasket.push(item);
            // ----------------------comment this out before deploy 2--------------------------

            console.log(`ADDED TO CART AGAIN --- ${title}`);
        } else {
            await updateState({
                type: 'DELETE_FROM_BASKET',
                id: id,
            })

            // ----------------------comment this out before deploy 3--------------------------
            const index = basket.findIndex((basketItem) => basketItem.id === id);

            if (index > -1) {
                newBasket.splice(index, 1);
            }
            // ----------------------comment this out before deploy 3--------------------------

            console.log(`DELETE FROM CART --- ${title}`);
        }

        // ----------------------comment this out before deploy 4--------------------------
        if (user) {
            const docData = {
                cart: newBasket
            }

            setDoc(cartDoc, docData);
        }
        // ----------------------comment this out before deploy 4--------------------------
    }

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

                <button className="checkoutProduct__button" onClick={toDo}>{buttonType}</button>

            </div>
        </div>
    )
}

export default CheckoutProduct