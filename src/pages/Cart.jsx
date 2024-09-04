import React from "react";
import './button.css'

const Cart = ({ cartItems }) => {
    console.log("Cart items received:", cartItems); // Add this to see if cartItems is being passed
    return (
        <div className="box max-w-screen-2xl h-screen items-center">
            <h2 className="text-4xl font-bold">Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <strong>{item.itemDetails.name}</strong> - {item.itemDetails.price}₪
                            <p>Extras: {item.extras.map(extra => extra.name).join(', ')}</p>
                            <p>Custom Text: {item.customText}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}

            <button
                className="button mt-4"
                onClick={() => console.log(cartItems)}
            >
                Continue Shopping
            </button>
            <button
                className="button mt-4"
                onClick={() => alert('Checkout not implemented yet')}
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;
