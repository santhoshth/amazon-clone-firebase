import { useEffect, useState } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getTotalPrice } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {

    const [{ basket, user }, updateSate] = useStateValue();

    const qty = basket != null ? basket.length : 0;
    const item = basket.length > 1 ? "items" : "item";

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);


    // when ever the basket changes, client secret will be updated with the new total amount and hepls us to charge the the right amount from the customer
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in currencies subunits (Rs.1 is 100 paise)
                url: `/payments/create?total=${getTotalPrice(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();

    }, [basket])

    console.log("secret key is", clientSecret);

    const handleSubmit = async (event) => {
        // stripe functionality here

        event.preventDefault();
        setProcessing(true);

        // confirming the payment with client secret and payment method using Card Elements 
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent means payment confirmation

            const docData = {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }

            // In the firestore db access the users collection
            const userCollection = collection(db, "users");

            // In the user collection reach to document of specific user id
            const userDoc = doc(userCollection, user?.uid);

            // In the document of user reach to the orders collection
            const orderCollection = collection(userDoc, "orders");

            // in the orders collection reach to document of unique order id
            const orderDoc = doc(orderCollection, paymentIntent.id);

            // in the document of order set doc with doc data
            setDoc(orderDoc, docData);

            // old way to set data
            /* db.collection('users').doc(user?.uid).collection('orders').doc('paymentIntent.id').set({
                data
            }) */

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            updateSate({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders');
        })
    }

    const handleChange = event => {
        // listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h2>Checkout (<Link to={'/checkout'}>{qty} {item}</Link>)</h2>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__content">
                        <p>{!user ? "Guest" : user.email}</p>
                        <p>Address Line 1</p>
                        <p>Address Line 2</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__content">
                        {basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__card__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <h4>Card Details</h4>
                        <form onSubmit={handleSubmit}>
                            <CardElement className="payment__card" onChange={handleChange} />
                            <div className="payment__total">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getTotalPrice(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={" ₹"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? "Processing" : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Error div will show only in case of any error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment