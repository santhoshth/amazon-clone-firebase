import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { getTotalPrice } from './reducer';


function Checkout() {
    const [{ basket }, updateState] = useStateValue();

    const totalPrice = getTotalPrice(basket);

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" />

                <div>
                    <h2 className="checkout__title">Shopping Cart</h2>
                    {basket.map((item) => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal total={totalPrice} itemCount={basket.length} />
            </div>
        </div>
    )
}

export default Checkout