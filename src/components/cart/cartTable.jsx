import React from "react";

const CartTable = ({ groupedItems }) => {
    return (
        <div className="max-h-[350px] overflow-y-auto w-[100%]">
            <table className="table-auto">
                {/* <thead> */}
                    {/* Your table headers */}
                {/* </thead> */}
                <tbody>
                    {groupedItems.map((item, index) => {
                        // Ensure price and quantity are numbers
                        const itemPrice = Number(item.itemDetails.price);
                        const itemQuantity = Number(item.quantity);
                        const extrasTotal = item.extras.reduce((sum, extra) => sum + (Number(extra.price) * itemQuantity), 0);
                        const finalPrice = (itemPrice * itemQuantity + extrasTotal).toFixed(2);

                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="px-4 py-2">₪{item.itemDetails.price * itemQuantity}</td>
                                    <td className="text-end px-4 py-2" style={{ paddingLeft: '4rem' }}>{item.itemDetails.name}</td>
                                    <td className="py-2">{itemQuantity}</td>
                                </tr>
                                {item.extras.length > 0 && (
                                    <tr key={`${index}-extras`}>
                                        <td className="py-0">
                                            {item.extras.map((extra, extraIndex) => (
                                                <div key={extraIndex} className="mb-0">
                                                    {extra.price > 0 ? `₪${extra.price}` : <br/>}
                                                </div>

                                            ))}
                                        </td>
                                        <td className="text-end px-4 py-0">
                                            {item.extras.map((extra, extraIndex) => (
                                                <div key={`${index}-extra-name-${extraIndex}`} className="mr-2 mb-0">{extra.name}</div>
                                            ))}
                                        </td>
                                        {/* <td></td> Empty cell for the quantity column */}
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;
