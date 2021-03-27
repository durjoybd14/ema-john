import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
               <ul>
                   <li> <Link to="/shop">Shop</Link></li>
                   <li><Link to="/order">Order Review</Link></li>
                   <li><Link to="/manage">Manage Inventory Here</Link></li>
                   {/* <li><Link to="/">Sign Out</Link></li> */}
                   <button onClick={() =>setLoggedInUser({})}>Sign Out</button>
               </ul>
            </nav>
        </div>
    );
};

export default Header;