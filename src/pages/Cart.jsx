import React, { useState, useEffect, useSyncExternalStore } from "react";
import CartTable from "../components/cart/cartTable";
import CartIcon from '../icons/CartIcon';
import Checkout from "../components/cart/Checkout";
import './button.css';

const Cart = ({ cartItems, setCartItems }) => {
    const [activeTab, setActiveTab] = useState("cart");

    const groupedItems = cartItems.reduce((acc, item) => {

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

    const calculateTotal = () => {
        return groupedItems.reduce((total, item) => {
            const itemTotal = item.itemDetails.price * item.quantity; // Base item total
            // Sum all extras for this item and multiply by the quantity
            const extrasTotal = item.extras.reduce((sum, extra) => sum + (extra.price * item.quantity), 0);

            // Return total cost including both item price and extras
            return total + itemTotal + extrasTotal;
        }, 0);
    };


    const clearCart = () => {
        localStorage.removeItem("cartItems"); // Remove items from localStorage
        setCartItems([]); // Clear the cartItems in state
    };


    const totalCost = calculateTotal(); // Calculate total once for display

    const renderCartWindows = () => {
        switch (activeTab) {
            case 'cart':
                return renderCart();
            case 'checkout':
                return <Checkout setActiveTab={setActiveTab} />;
            default:
                break;
        }
    }

    const renderCart = () => {
        return (
            <>
                <div className="justify-between">
                    <h2 className="text-4xl font-bold mb-4">Cart</h2>

                    <div className="flex flex-row items-center mt-auto">
                        {groupedItems.length > 0 ? (
                            <CartTable groupedItems={groupedItems} />
                        ) : (
                            <div className="h-40 w-48 mt-32">
                                <div style={{ transform: 'scale(2)', display: 'inline-block' }}>
                                    <CartIcon />
                                </div>
                                <h3 className="font-bold mt-4">Your cart is empty.</h3>
                            </div>
                        )}
                    </div>
                </div>
                {/* Conditional Rendering for Buttons */}
                <div className="flex flex-col space-y-2 mt-auto mb-2 items-center w-screen">
                    {groupedItems.length > 0 && (
                        <>
                            <div className="flex flex-row mt-4">
                                <h3 className="text-2xl font-bold">Total: ₪{totalCost.toFixed(2)}</h3>
                                <button className="items-end" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                            <button
                                className="button py-1 w-fit"
                                onClick={() => { setActiveTab('checkout') }}>
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
            </>
        );
    }

    return (
        <>
            <div className="box max-w-screen-2xl h-screen items-center">

                {renderCartWindows()}
            </div>
        </>
    );
};

export default Cart;
