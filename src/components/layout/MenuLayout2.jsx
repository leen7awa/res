import React from 'react';
import subMenu from '../../db/submenu';
import menu from '../../db/menu';
import '../../pages/button.css';

const MenuLayout2 = ({ chosenCategory, setChosenWindow, setItemDetails}) => {
    const selectedMenuItem = menu.data.find(menuItem => menuItem.id === chosenCategory);

    const handleItemClick = (subMenuItem) => {
        setItemDetails({
            name: subMenuItem.name,
            price: subMenuItem.price,
            desc: subMenuItem.desc
        });
        setChosenWindow(3);
    };

    return (
        <>
            <h2 className="text-4xl font-bold">
                {selectedMenuItem.name}
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4 overflow-y-auto">
                {subMenu.data
                    .filter(subMenuItem => subMenuItem.menu_id === chosenCategory)
                    .map(subMenuItem => (
                        <div key={subMenuItem.id} className="mb-4">
                            <button
                                className="border border-black flex flex-col p-4 text-center items-center min-w-40 rounded-lg"
                                onClick={() => handleItemClick(subMenuItem)}
                            >
                                <div> {subMenuItem.name}</div>
                                <div>{subMenuItem.price}₪</div>
                            </button>
                        </div>
                    ))}
            </div>
            <button
                className="button p-2 w-1/3 mt-4"
                onClick={() => setChosenWindow(1)}
            >
                Back
            </button>
        </>
    );
};

export default MenuLayout2;