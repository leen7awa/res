import React, { useState } from "react";
import CartTable from "../components/cart/cartTable";
import CartIcon from '../icons/CartIcon';
import Checkout from "../components/cart/Checkout";
import ConfirmationModal from "../components/ConfirmationModal";
import './button.css';
import './windowMsg.css';

const Cart = ({ cartItems, setCartItems }) => {
    const [activeTab, setActiveTab] = useState("cart");
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Group items based on name, extras, and custom text, and use the actual quantity from cartItems
    const groupedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(
            (i) =>
                i.itemDetails.name === item.itemDetails.name &&
                JSON.stringify(i.extras) === JSON.stringify(item.extras) &&
                i.customText === item.customText
        );

        if (existingItem) {
            existingItem.quantity += item.quantity; // Add the actual quantity
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    // Calculate the total price of items in the cart including extras
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
                <div className="flex flex-col w-full">
                    {/* top section */}
                    {groupedItems.length > 0 && (
                        <div className="relative flex-1 flex items-center p-4">
                            <button
                                className="relative z-10 text-white px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700"
                                onClick={() => setShowConfirmation(true)}
                            >
                                Clear Cart
                            </button>
                            <h2 className="absolute inset-0 flex items-center justify-center text-black text-3xl">
                                Cart
                            </h2>
                        </div>
                    )}
                </div>
                {/* middle section */}
                <div className="flex flex-grow items-top text-center justify-center mt-auto">
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
                {/* bottom section */}
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
            <div className="box items-center">
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
