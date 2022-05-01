import "./Product.css";
import { useStateValue } from './StateProvider';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from './firebase';

function Product({ id, title, price, rating, image }) {

    const [{ basket, user }, updateState] = useStateValue();

    const addToCart = async () => {
        // add the item into the data layer
        const item = {
            id: id,
            title: title,
            price: price,
            rating: rating,
            image: image,
        };

        await updateState({
            type: 'ADD_TO_BASKET',
            items: item
        })

        // ----------------------comment this out before deploy--------------------------
        let newBasket = basket;
        newBasket.push(item);

        if (user) {
            const docData = {
                cart: newBasket
            }

            // In the firestore db access the users collection
            const userCollection = collection(db, "users");
            // In the user collection reach to document of specific user id
            const userDoc = doc(userCollection, user?.uid);
            const cartCollection = collection(userDoc, "basket");
            const cartDoc = doc(cartCollection, "basketItems");

            // console.log(docData);
            setDoc(cartDoc, docData);
        }
        // ----------------------comment this out before deploy--------------------------

        console.log(`ADDED TO CART --- ${title}`);
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