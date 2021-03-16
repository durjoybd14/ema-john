import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
               <ul>
                   <li> <Link to="/shop">Shop</Link></li>
                   <li><Link to="/order">Order Review</Link></li>
                   <li><Link to="/manage">Manage Inventory Here</Link></li>
               </ul>
            </nav>
        </div>
    );
};

export default Header;