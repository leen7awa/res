import React, { useState, useEffect } from "react";
import CartTable from "../components/cart/cartTable";
import './button.css';
import CartIcon from '../icons/CartIcon';

const Cart = ({ cartItems, setCartItems }) => {

    // Function to check for duplicates and add quantity
    const groupedItems = cartItems.reduce((acc, item) => {
        // Find if the item already exists based on itemDetails.name, extras, and customText
        const existingItem = acc.find(
            (i) =>
                i.itemDetails.name === item.itemDetails.name &&
                JSON.stringify(i.extras) === JSON.stringify(item.extras) &&
                i.customText === item.customText
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    // Function to calculate total cost
    const calculateTotal = () => {
        return groupedItems.reduce((total, item) => {
            // Assuming each item has a price in itemDetails.price
            const itemTotal = item.itemDetails.price * item.quantity;
            return total + itemTotal;
        }, 0);
    };

    const clearCart = () => {
        localStorage.removeItem("cartItems"); // Remove items from localStorage
        setCartItems([]); // Clear the cartItems in state
    };


    const totalCost = calculateTotal(); // Calculate total once for display

    return (
        <div className="box max-w-screen-2xl h-screen items-center">
            <h2 className="text-4xl font-bold">Cart</h2>

            <div className="flex flex-row max-h-[600px] overflow-y-auto items-center mt-24 rounded-2xl bg-slate-100">
                {groupedItems.length > 0 ? (
                    <CartTable groupedItems={groupedItems} />
                ) : (
                    <div className="h-40 w-48 mt-16">
                        <div style={{ transform: 'scale(2)', display: 'inline-block' }}>
                            <CartIcon />
                        </div>
                        <h3 className="font-bold">Your cart is empty.</h3>
                    </div>
                )}
            </div>

            {/* Conditional Rendering for Buttons */}
            <div className="flex flex-col space-y-2 mt-auto mb-2 items-center">
                {groupedItems.length > 0 && (
                    <>
                        <div className="flex flex-row mt-4">
                            <h3 className="text-2xl font-bold">Total: ${totalCost.toFixed(2)}</h3>
                            <button className="text-right" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>
                        <button className="button py-2" onClick={() => alert(':)')}>
                            Checkout
                        </button>
                    </>
                )}
                {/* Always show 'Back to menu' button */}
                <button
                    className="button py-2"
                    onClick={() => {
                        window.location.href = '/menu';
                    }}
                >
                    Back to menu
                </button>
            </div>
        </div>
    );
};

export default Cart;
