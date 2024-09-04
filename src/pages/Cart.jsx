import React from "react";
import './button.css';

const Cart = ({ cartItems }) => {
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

    console.log("Grouped cart items:", groupedItems);

    return (
        <div className="box max-w-screen-2xl h-screen items-center">
            <h2 className="text-4xl font-bold">Cart</h2>
             <div className="flex flex-row max-h-[600px] overflow-y-auto w-full">
                {groupedItems.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Extras</th>
                                <th className="border border-gray-300 px-4 py-2">Custom Text</th>
                                <th className="border border-gray-300 px-4 py-2">Price per Item</th>
                                <th className="border border-gray-300 px-4 py-2">Final Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.itemDetails.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.extras.map(extra => extra.name).join(', ')}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{item.customText}</td>
                                    <td className="border border-gray-300 px-4 py-2">₪{item.itemDetails.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ₪{(item.itemDetails.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="flex flex-col space-y-2 mt-auto mb-4">
                <button
                    className="button py-2"
                    onClick={() => console.log(groupedItems)}
                >
                    Continue Shopping
                </button>
                <button
                    className="button py-2"
                    onClick={() => alert('Checkout not implemented yet')}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
