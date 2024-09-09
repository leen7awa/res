import React, { useState } from 'react';
import extras from '../../db/extras.json';
import tosafot from '../../db/tosafot.json';
import CheckIcon from '../../icons/CheckIcon';
import '../../pages/button.css';

const MenuLayout3 = ({ setChosenWindow, itemDetails, addItemToCart }) => {
    const itemTosafot = tosafot.data.filter(tosaf => tosaf.item_id === itemDetails.id);
    const [inputValue, setInputValue] = useState('');
    const [checkedExtras, setCheckedExtras] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (event, extraName, tosafPrice) => {
        if (event.target.checked) {
            setCheckedExtras([...checkedExtras, { name: extraName, price: tosafPrice }]);
        } else {
            setCheckedExtras(checkedExtras.filter(extra => extra.name !== extraName));
        }
    };

    const handleAddToCart = () => {
        addItemToCart(itemDetails, checkedExtras, inputValue);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 1000);
    };

    // Function to clear all checkboxes
    const handleClearExtras = () => {
        setCheckedExtras([]); // Clear all checked extras
    };

    return (
        <>
            <div className='overflow-y-auto flex flex-col items-center w-[100%]'>

                <h2 className="text-2xl font-bold">{itemDetails.name} ₪{itemDetails.price}</h2>
                {showConfirmation && (
                    <div className="mt-4 font-semibold items-end bg-green-100 flex flex-row rounded-2xl border border-green-500 text-green-700 px-8 py-2" role="alert">
                        <CheckIcon />
                        <p className="text-sm ml-1">Item added to cart.</p>
                    </div>
                )}

                <p className="text-xl mt-4">{itemDetails.desc}</p>
                {itemTosafot.length > 0 ? (
                    <>
                        <div className='flex flex-row justify-between border-b-2 w-full font-semibold'>
                            <h3 className="text-xl text-start">extras</h3>
                            <button onClick={handleClearExtras}>clear extras</button>
                        </div>
                        <div className="flex flex-wrap justify-start">
                            {itemTosafot.map((tosaf, index) => {
                                const extra = extras.data.find(extra => extra.semel === tosaf.tosaf_id);

                                return (
                                    <div key={index} className="flex flex-col items-start mt-2 mr-4 font-semibold">
                                        {extra && (
                                            <div className="flex flex-row items-center gap-1">
                                                <input
                                                    id="default-checkbox"
                                                    type="checkbox"
                                                    value={extra.name}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                    onChange={(event) => handleCheckboxChange(event, extra.name, tosaf.tosaf_price)}
                                                    checked={checkedExtras.some(checkedExtra => checkedExtra.name === extra.name)} // Corrected line
                                                />
                                                <p className="mr-2">
                                                    {extra.name} {tosaf.tosaf_price > 0 ? `${tosaf.tosaf_price}₪` : ''}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : null}

                <button
                    className="button"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>

                <button
                    className="button bg-slate-500 hover:bg-slate-600 p-1 w-1/4 mt-4"
                    onClick={() => setChosenWindow(2)}
                >
                    Back
                </button>
            </div>
        </>
    );
};

export default MenuLayout3;
