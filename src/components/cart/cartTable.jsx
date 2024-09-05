import React from "react";

const CartTable = ({ groupedItems }) => {
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Item</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Extras</th>
                    <th className="border border-gray-300 px-4 py-2">Custom Text</th>
                    <th className="border border-gray-300 px-4 py-2">Price per Item</th>
                    <th className="border border-gray-300 px-4 py-2">Final Price</th>
                </tr>
            </thead>
            <tbody>
                {groupedItems.map((item, index) => (
                    <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{item.itemDetails.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
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
    );
};

export default CartTable;