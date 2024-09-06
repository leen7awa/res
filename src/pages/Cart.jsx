import React, { useState, useEffect, useSyncExternalStore } from "react";
import CartTable from "../components/cart/cartTable";
import CartIcon from '../icons/CartIcon';
import Checkout from "../components/cart/Checkout";
import ConfirmationModal from "../components/ConfirmationModal";
import './button.css';
import './windowMsg.css';

const Cart = ({ cartItems, setCartItems }) => {
    const [activeTab, setActiveTab] = useState("cart");
    const [showConfirmation, setShowConfirmation] = useState(false);

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
                <div className="flex flex-col items-center mt-4">
                    {/* Adjusted flexbox layout */}
                    <div className="flex items-center w-full mb-4 px-4 relative">
                        {groupedItems.length > 0 ? (
                            <button
                                className="button hover:bg-red-700 w-fit py-2 bg-red-600 font-normal text-base"
                                // onClick={clearCart}
                                onClick={() => setShowConfirmation(true)}
                            >
                                Clear Cart
                            </button>
                        ) : (
                            <div className="w-20"></div> // Placeholder to maintain layout
                        )}

                        {/* Center the Cart header */}
                        <h2 className="text-4xl font-bold text-center mx-auto">
                            Cart
                        </h2>

                        {/* Placeholder div for alignment */}
                        <div className="w-20"></div>
                    </div>

                    <div className="flex flex-col items-center mt-auto">
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
                            <h3 className="text-2xl font-bold">Total: ₪{totalCost.toFixed(2)}</h3>
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
                        Menu
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="box max-w-screen-2xl h-[100%] items-center">
                {renderCartWindows()}
            </div>

            {showConfirmation && (
                <ConfirmationModal
                    message="Are you sure you want to clear the cart?"
                    onConfirm={() => {
                        clearCart()
                        setShowConfirmation(false)
                    }}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}
        </>
    );
};

export default Cart;
