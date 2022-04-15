import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';

function Payment() {

    const [{ basket, user }, updateSate] = useStateValue();

    const qty = basket != null ? basket.length : 0;
    const item = basket.length > 1 ? "items" : "item";

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
                    <div className="payment__content">
                        <h4>Card Details</h4>
                        <form>
                            <input type="card"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment