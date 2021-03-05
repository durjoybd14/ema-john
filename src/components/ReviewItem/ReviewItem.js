import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const { name, quantity, key, price } = props.product;
    // const handleRemoveProduct = props.handleRemoveProduct;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    };

    return (
        <div style={reviewItemStyle} className="reviewItem">
            <h4 className="product-name">Name: {name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <br/>
            <button onClick={() => props.handleRemoveProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;