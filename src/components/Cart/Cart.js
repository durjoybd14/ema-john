import React from 'react';
import './cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;

    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total < 15 && total !== 0) {
        shipping = 12.99;
    }

    const tax = total * .1;
    const grandTotal = total + shipping + tax;
    const formatNumber = (num) => {
        const precision = Math.round(num);
        return parseInt(precision)
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Order: {cart.length} </p>
            <p>Product Price: {formatNumber(total)} </p>
            <p><small>Shipping Cost: {formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p>Total Price: ${formatNumber(grandTotal)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;