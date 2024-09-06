import React from "react";

const CartTable = ({ groupedItems }) => {
    return (
        <div className="max-h-[350px] overflow-y-auto bg-slate-100 rounded-2xl w-[100%]">
        <table className="max-w-full table-auto border-collapse border border-gray-400">
            <thead className="sticky top-0 bg-slate-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Item</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Extras</th>
                    {/* <th className="border border-gray-300 px-4 py-2">Custom Text</th> */}
                    <th className="border border-gray-300 px-4 py-2">Price per Item</th>
                    <th className="border border-gray-300 px-4 py-2">Final Price</th>
                </tr>
            </thead>
            <tbody>
                {groupedItems.map((item, index) => {
                    // Ensure price and quantity are numbers
                    const itemPrice = Number(item.itemDetails.price);
                    const itemQuantity = Number(item.quantity);
                    const extrasTotal = item.extras.reduce((sum, extra) => sum + (Number(extra.price)*itemQuantity), 0);
                    const finalPrice = (itemPrice * itemQuantity + extrasTotal).toFixed(2);

                    return (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{item.itemDetails.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{itemQuantity}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {item.extras.map(extra => (extra.name + '  ₪' + extra.price)).join(', ')}
                            </td>
                            {/* <td className="border border-gray-300 px-4 py-2">{item.customText}</td> */}
                            <td className="border border-gray-300 px-4 py-2">₪{itemPrice}</td>
                            <td className="border border-gray-300 px-4 py-2">₪{finalPrice}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
};

export default CartTable;
