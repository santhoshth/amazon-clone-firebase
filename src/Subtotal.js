import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';

function Subtotal({ total, itemCount }) {
    const item = itemCount <= 1 ? "item" : "items";

    // useHistory helps us to access the browser history
    // and also push to other pages just like LINK
    // here we have use this instead of LINK beccause, using Link will make the button link like hyperlink
    // so, useHistory object history will be used as event handler
    const navigate = useNavigate();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p className="subtotal__count">
                            Subtotal ({`${itemCount} ${item}`}):<strong className="subtotal__total">{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />
                            <p> This order contains a gift</p>
                        </small>
                    </>
                )}
                decimalScale={2}
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" ₹"}
            />

            <button className="subtotal__button" onClick={e => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal