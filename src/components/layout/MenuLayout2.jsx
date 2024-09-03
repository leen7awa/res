import React from 'react';
import subMenu from '../../db/submenu';
import menu from '../../db/menu';
import '../../pages/button.css';
import './MenuLayout2.css';

const MenuLayout2 = ({ chosenCategory, setChosenWindow, setItemDetails }) => {
    const selectedMenuItem = menu.data.find(menuItem => menuItem.id === chosenCategory);

    const handleItemClick = (subMenuItem) => {
        setItemDetails({
            id: subMenuItem.id,
            name: subMenuItem.name,
            price: subMenuItem.price,
            desc: subMenuItem.desc
        });
        setChosenWindow(3);
    };

    return (
        <>
            <h2 className="menu-layout-title">
                {selectedMenuItem.name}
            </h2>
            <div className="menu-grid">
                {subMenu.data
                    .filter(subMenuItem => subMenuItem.menu_id === chosenCategory)
                    .map(subMenuItem => (
                        <div key={subMenuItem.id} className="menu-item">
                            <button
                                className="menu-button"
                                onClick={() => handleItemClick(subMenuItem)}
                            >
                                <div>{subMenuItem.name}</div>
                                <div>{subMenuItem.price}₪</div>
                            </button>
                        </div>
                    ))}
            </div>
            <button
                className="button p-2 w-full md:w-1/4 mt-4"
                onClick={() => setChosenWindow(1)}
            >
                Back
            </button>
        </>
    );
};

export default MenuLayout2;
