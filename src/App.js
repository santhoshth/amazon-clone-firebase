import { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
// Routers are used to navigate through pages

function App() {
  const [{ }, updateState] = useStateValue();

  // to track who is logged in
  useEffect(() => {
    // will only run once when the app component loads...
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // the user logged in
        updateState({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        updateState({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    //BEM naming convention used
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<><Header /><Payment /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
