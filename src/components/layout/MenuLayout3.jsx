import React, { useState } from 'react';
import extras from '../../db/extras.json';
import tosafot from '../../db/tosafot.json';
import CheckIcon from '../../icons/CheckIcon';
import PlusIcon from '../../icons/PlusIcon';
import MinusIcon from '../../icons/MinusIcon';
import '../../pages/button.css';

const MenuLayout3 = ({ setChosenWindow, itemDetails, addItemToCart }) => {
    const itemTosafot = tosafot.data.filter(tosaf => tosaf.item_id === itemDetails.id);
    const [inputValue, setInputValue] = useState('');
    const [checkedExtras, setCheckedExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleCheckboxChange = (event, extraName, tosafPrice) => {
        if (event.target.checked) {
            setCheckedExtras([...checkedExtras, { name: extraName, price: tosafPrice }]);
        } else {
            setCheckedExtras(checkedExtras.filter(extra => extra.name !== extraName));
        }
    };

    const handleAddToCart = () => {
        addItemToCart(itemDetails, checkedExtras, inputValue, quantity); // Pass quantity to addItemToCart
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 1000);
        setTimeout(() => {
            setChosenWindow(1);
        }, 1000);
    };

    // Function to clear all checkboxes
    const handleClearExtras = () => {
        setCheckedExtras([]); // Clear all checked extras
    };

    return (
        <div className="flex flex-col h-screen w-full">
            {/* Top Section */}
            <div className="flex-shrink-0 justify-center">
                <h2 className="text-2xl font-bold">{itemDetails.name} ₪{itemDetails.price}</h2>
                {showConfirmation && (
                    <div className="mt-4 font-semibold items-end bg-green-100 flex flex-row rounded-2xl border border-green-500 text-green-700 px-8 py-2" role="alert">
                        <CheckIcon />
                        <p className="text-sm ml-1">Item added to cart.</p>
                    </div>
                )}
                <p className="text-xl mt-4">{itemDetails.desc}</p>
            </div>

            {/* Middle Section */}
            <div className="flex-wrap min-h-0 max-h-[400px] bg-slate-100 rounded-xl">
            {itemTosafot.length > 0 && (
                    <>
                        <div className='flex flex-row justify-between border-b-2 w-full font-semibold'>
                            <h3 className="text-xl text-start">extras</h3>
                            {checkedExtras.length > 0 &&
                                (<button
                                    className='border border-blue-950 px-2 rounded-2xl bg-slate-200'
                                    onClick={handleClearExtras}
                                >clear extras</button>)
                            }
                        </div>
                        <div
                            className="flex flex-wrap justify-center items-start max-h-[300px] mt-4 overflow-y-auto"
                        >
                            <div className="grid grid-cols-4 gap-4">
                                {itemTosafot.map((tosaf, index) => {
                                    const extra = extras.data.find(extra => extra.semel === tosaf.tosaf_id);
                                    const isChecked = checkedExtras.some(checkedExtra => checkedExtra.name === extra?.name);

                                    return (
                                        extra && (
                                            <button
                                                key={index}
                                                className={`flex flex-col items-start p-4 border rounded-md w-24 h-24 justify-center shadow-sm ${isChecked ? 'bg-blue-100 border-blue-500' : 'bg-white'
                                                    }`}
                                                onClick={() => handleCheckboxChange({ target: { checked: !isChecked } }, extra.name, tosaf.tosaf_price)}
                                            >
                                                <div className="flex flex-row items-center gap-1">
                                                    <p className="mr-2">
                                                        {extra.name} {tosaf.tosaf_price > 0 ? `${tosaf.tosaf_price}₪` : ''}
                                                    </p>
                                                </div>
                                            </button>
                                        )
                                    );
                                })}
                            </div>


                        </div>
                    </>
                )}            </div>

            {/* Bottom Section */}
            <div className="flex-1">
            <div className="mt-4 flex items-center gap-2">
                        <form className="mx-auto my-0">
                            <div className="relative flex items-center">
                                <button
                                    type="button"
                                    id="decrement-button"
                                    onClick={handleQuantityDecrement}
                                    className="flex-shrink-0 bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                    <MinusIcon />
                                </button>
                                <input
                                    type="text"
                                    id="counter-input"
                                    value={quantity}
                                    readOnly
                                    className=" text-black border-0 focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                />
                                <button
                                    type="button"
                                    id="increment-button"
                                    onClick={handleQuantityIncrement}
                                    className="flex-shrink-0 bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='flex flex-col items-center'>
                        <button
                            className="button w-auto scale-90"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                        <button
                            className="button bg-slate-500 hover:bg-slate-600 w-fit py-2 mt-2"
                            onClick={() => setChosenWindow(2)}
                        >
                            Back
                        </button>
                    </div>
            </div>
        </div>
    );

};

export default MenuLayout3;
