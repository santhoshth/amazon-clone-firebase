import './Orders.css';
import Order from './Order';
import { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import { collection, doc, orderBy, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { Dropdown } from 'rsuite';
import { ButtonToolbar } from 'rsuite';
import '../node_modules/rsuite/dist/rsuite.min.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [{ basket, user }, updateState] = useStateValue();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userRef = collection(doc(collection(db, "users"), user?.uid), "orders");
            const q = query(userRef, orderBy("created", "desc"));

            const unsub = onSnapshot(q, (snapshot) => {
                setOrders(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
            });
            // const unsub = onSnapshot(q, (snapshot) => {
            //     snapshot.docs.map(doc => (
            //         console.log(doc.data().basket)
            //     ))
            // });
        } else {
            setOrders([]);
            navigate('/Login');

        }
    }, [user])

    const CustomDropdown = ({ ...props }) => (
        <Dropdown {...props}>
            <Dropdown.Item>number 1</Dropdown.Item>
            <Dropdown.Item>number 2</Dropdown.Item>
            <Dropdown.Item>number 3</Dropdown.Item>
        </Dropdown>
    );


    return (
        <div className="orders">
            <ButtonToolbar>
                <CustomDropdown title="Hover Da" trigger="hover" />
            </ButtonToolbar>
            {/* <Button apperance="primary">haii</Button> */}
            <h1>Your Orders</h1>
            {orders.map(order =>
                <Order order={order} />
            )}
        </div>
    )
}

export default Orders