import moment from 'moment';
import './Order.css';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
    return (
        <div className="order">
            <div className="order__header">
                <div className="order__header__left">
                    <CurrencyFormat
                        renderText={(value) => (
                            <p className="order__total">TOTAL<p>{value}</p></p>
                        )}
                        decimalScale={2}
                        value={order.data.amount / 100}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        className="order__total"
                    />
                    <p className="order__date">ORDER PLACED <p>{moment.unix(order.data.created).format("DD MMMM YYYY, hh:mm a")}</p></p>
                </div>
                <div className="order__header__right">
                    <p className="order__id">ORDER # <small>{order.id}</small></p>
                </div>
            </div>

            <div className="order__items">
                {order.data.basket?.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        price={item.price}
                        image={item.image}
                        orderPageButton={true}
                    />
                ))}
            </div>

        </div>
    )
}

export default Order