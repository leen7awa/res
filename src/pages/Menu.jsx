import React, { useState } from 'react';
import MenuLayout1 from '../components/layout/MenuLayout1';
import MenuLayout2 from '../components/layout/MenuLayout2';
import MenuLayout3 from '../components/layout/MenuLayout3';

const Menu = ({ addItemToCart, cartItems }) => {
    const [expandedId, setExpandedId] = useState(null);
    const [chosenCategory, setChosenCategory] = useState(0);
    const [chosenWindow, setChosenWindow] = useState(1);
    const [itemDetails, setItemDetails] = useState({ id: '', name: '', price: '', desc: '' });

    const toggleCollapse = (id) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const pickWindow = () => {
        switch (chosenWindow) {
            case 1:
                return (
                    <MenuLayout1
                        expandedId={expandedId}
                        toggleCollapse={toggleCollapse}
                        setChosenCategory={setChosenCategory}
                        setChosenWindow={setChosenWindow}
                    />
                );
            case 2:
                return (
                    <MenuLayout2
                        chosenCategory={chosenCategory}
                        setChosenWindow={setChosenWindow}
                        setItemDetails={setItemDetails}
                    />
                );
            case 3:
                return <MenuLayout3
                    setChosenWindow={setChosenWindow}
                    itemDetails={itemDetails}
                    addItemToCart={addItemToCart}
                />;
            default:
                break;
        }
    };

    return (
        <div className="box items-center">
            {pickWindow()}
        </div>
    );
};

export default Menu;
