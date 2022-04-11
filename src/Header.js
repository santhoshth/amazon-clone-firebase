import React from 'react'
import './Header.css';
import logo from './logo.jpg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Header() {
    const [{ basket }, updateState] = useStateValue();
    const qty = basket.length;
    return (
        <div className='header'>
            {/* Amazon Logo */}
            <Link to='/'>
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
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Hello, Guest
                    </span>
                    <span className='header__optionLineTwo'>
                        Sign in
                    </span>
                </div>

                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                    </span>
                    <span className='header__optionLineTwo'>
                        & Orders
                    </span>
                </div>

                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>

                <Link to='/checkout'>
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