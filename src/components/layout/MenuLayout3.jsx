import React from 'react';
import '../../pages/button.css';

const MenuLayout3 = ({ setChosenWindow, itemDetails }) => {
    return (
        <>
            <h2 className="text-4xl font-bold">{itemDetails.name}</h2>
            <div>img here</div>
            <p className="text-xl mt-2">Price: {itemDetails.price}₪</p>
            <p className="text-lg mt-4">{itemDetails.desc}</p>
            <button className="button">add to cart</button>
            <button
                className="button bg-slate-500 hover:bg-slate-600 p-1 w-1/4 mt-4"
                onClick={() => setChosenWindow(2)}
            >
                Back
            </button>
        </>
    );
};

export default MenuLayout3;