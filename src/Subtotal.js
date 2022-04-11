import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';

function Subtotal({ total, itemCount }) {
    const item = itemCount <= 1 ? "item" : "items";

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

            <button className="subtotal__button">Proceed to Buy</button>
        </div>
    )
}

export default Subtotal