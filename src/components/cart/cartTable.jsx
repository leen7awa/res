import React from "react";

const CartTable = ({ groupedItems }) => {
    return (
        <div className="max-h-[350px] overflow-y-auto w-[100%]">
            <table className="table-auto">
                {/* <thead className="sticky top-0 bg-slate-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Item</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Extras</th>
                    <th className="border border-gray-300 px-4 py-2">Price per Item</th>
                    <th className="border border-gray-300 px-4 py-2">Final Price</th>
                </tr>
            </thead> */}
                <tbody>
                    {groupedItems.map((item, index) => {
                        // Ensure price and quantity are numbers
                        const itemPrice = Number(item.itemDetails.price);
                        const itemQuantity = Number(item.quantity);
                        const extrasTotal = item.extras.reduce((sum, extra) => sum + (Number(extra.price) * itemQuantity), 0);
                        const finalPrice = (itemPrice * itemQuantity + extrasTotal).toFixed(2);

                        {/* <td className="px-4 py-2">₪{finalPrice}</td> */ }
                        return (
                            <>
                                <tr key={index}>
                                    <td className="px-4 py-2">₪{item.itemDetails.price * itemQuantity}</td>
                                    <td className="text-end px-4 py-2" style={{ paddingLeft: '4rem' }}>{item.itemDetails.name}</td>
                                    <td className="px-4 py-2">{itemQuantity}</td>
                                    {/* <td className="px-4 py-2" style={{ paddingRight: '8rem' }}>item name</td> */}
                                    {/* <td className="px-4 py-2">₪{item.itemDetails.price}</td> */}
                                </tr>
                                {item.extras.length > 0 && (
                                    <tr key={`${index}-extras`}>
                                        <td className="py-0">
                                            {item.extras.map((extra, extraIndex) => (
                                                extra.price > 0 && (
                                                    <div key={extraIndex} className="mb-0">₪{extra.price}</div>
                                                )
                                            ))}
                                        </td>
                                        <td className="text-end px-4 py-0">
                                            {item.extras.map((extra, extraIndex) => (
                                                // <div key={extraIndex}>{extra.name}</div>
                                                <div key={extraIndex} className="mr-2 mb-0">{extra.name}</div>
                                            ))}
                                        </td>
                                        <td></td> {/* Empty cell for the quantity column */}

                                    </tr>
                                )}
                            </>
                        );



                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;
