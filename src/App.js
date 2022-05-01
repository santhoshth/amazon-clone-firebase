import { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Routers are used to navigate through pages
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from './firebase';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51KoryQSGBRJuCHBJyvTcQpLutS1GhcS0ZX2LleBy8IZy5ucebyo03lxi6esiBKTHAe9ziD6xU1sM4yp82INEvXc4002EgTPq8W");


function App() {
  const [{ basket, user }, updateState] = useStateValue();

  // to track who is logged in
  useEffect(() => {

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        updateState({
          type: 'SET_USER',
          user: authUser
        })

        // ----------------------comment this out before deploy--------------------------
        const userCollection = collection(db, "users");
        const userDoc = doc(userCollection, authUser.uid);
        const cartCollection = collection(userDoc, "basket");
        const cartDoc = doc(cartCollection, "basketItems");

        const unsub = onSnapshot(cartDoc, (doc) => (
          updateState({
            type: 'SET_BASKET',
            basket: doc.data().cart
          })
        ));
        // ----------------------comment this out before deploy--------------------------
      } else {
        // the user is logged out
        updateState({
          type: 'SET_USER',
          user: null
        })

        updateState({
          type: 'EMPTY_BASKET',
        })
      }
    })
  }, [user])

  return (
    //BEM naming convention used
    <Router>
      <div className="app">
        <Routes>
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<>
            <Header />
            <Elements stripe={stripePromise} >
              <Payment />
            </Elements></>}
          />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
