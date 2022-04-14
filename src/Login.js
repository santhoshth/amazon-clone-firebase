import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = e => {
        // to avoid refreshing the page on clicking submit
        e.preventDefault();

        // firebase stuff for login
        signInWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                if (credentials) {
                    navigate('/');
                }
                console.log(`SIGN IN --- ${email}`);
            })
            .catch((err) => alert(err.message));
    }

    const register = e => {
        // to avoid refreshing the page on clicking submit
        e.preventDefault();

        //firebase stuff for register
        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                // if successfully created a new user with email and password
                if (credentials) {
                    navigate('/');
                }
                console.log(`NEW USER --- ${email}`);
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" />
            </Link>

            <div className="login__container">
                <p className="login__title">Sign-in</p>
                <form className="login__form">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit" onClick={e => signIn(e)}>Sign In</button>
                </form>
                <p className="login__conditions">By continuing, you agree to Amazon Fake Clone's Conditions of Use and Privacy Notice. </p>
            </div>

            <div className="login__register">
                <p className="login__registerTitle">New to Amazon?</p>
                <button className="login__registerButton" onClick={e => register(e)}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login