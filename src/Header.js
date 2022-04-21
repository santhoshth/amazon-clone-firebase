import React from 'react'
import './Header.css';
import logo from './logo.jpg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Header() {
    const [{ basket, user }, updateState] = useStateValue();

    const qty = basket.length;

    const signOutUser = () => {
        if (user) {
            signOut(auth)
                .then(() => {
                    console.log(`SIGN OUT --- ${user.email}`);
                })
                .catch(err => {
                    alert(err.message);
                })
        }
    }

    return (
        <div className='header'>
            {/* Amazon Logo */}
            <Link className='link' to='/'>
                <img className='header__logo' src={logo} />
            </Link>

            {/* Search bar with a input text field and search button */}
            <div className='header__search'>
                <input type='text' className='header__searchInput' />
                {/* Search Button using Material UI */}
                <SearchIcon className='header__searchIcon'></SearchIcon>
            </div>

            {/* Header Navigation Icons like Sign in, Orders, Cart Navigation*/}
            <div className='header__nav'>
                {/* If no user then navigate to login page */}
                <Link className='link' to={!user && '/login'}>
                    <div onClick={signOutUser} className='header__option'>
                        <span className='header__optionLineOne'>
                            Hello, {user ? user.email : "Guest"}
                        </span>

                        <span className='header__optionLineTwo' >
                            {user ? 'Sign out' : 'Sign In'}
                        </span>
                    </div>
                </Link>

                <Link className='link' to='/orders'>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>
                            Returns
                        </span>
                        <span className='header__optionLineTwo'>
                            & Orders
                        </span>
                    </div>
                </Link>

                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>

                <Link className='link' to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingCartIcon />
                        <span className='header__optionLineTwo header__basketCount'>
                            {qty}
                        </span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Header