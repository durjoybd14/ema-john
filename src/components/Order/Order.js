import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Order = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        // console.log('order placed');
        setCart([]);
        setOrderPlaced(true)
        processOrder();
    }

    const handleRemoveProduct = (productKey) => {
        // console.log("clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart)
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        //    console.log(cartProducts);
        setCart(cartProducts);
    }, []);



    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />

    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem handleRemoveProduct={handleRemoveProduct} product={pd} key={pd.key}></ReviewItem>)
                }

                {thankYou}


            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;