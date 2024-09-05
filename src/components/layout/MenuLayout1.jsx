import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainMenu from '../../db/mainmenu';
import menu from '../../db/menu';
import '../../pages/button.css';

const MenuLayout1 = ({ setChosenCategory, setChosenWindow }) => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);

    const toggleCollapse = (id) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    return (
        <>
            <h2 className="text-4xl font-bold">Menu</h2>
            <div className="grid grid-cols-2 gap-4 mt-4 overflow-y-auto">
                {mainMenu.data.map(mainMenuItem => (
                    <div key={mainMenuItem.id} className="mb-4">
                        <button
                            className="border border-black p-4 text-center min-w-40 rounded-lg"
                            onClick={() => toggleCollapse(mainMenuItem.id)}
                        >
                            <span>{mainMenuItem.name}</span>
                            <i className={`absolute right-0 pt-1 text-xs fa ${expandedId === mainMenuItem.id ? 'fa-minus' : 'fa-plus'}`}></i>
                        </button>
                        {expandedId === mainMenuItem.id && (
                            <div
                                className="overflow-y-auto max-h-40 transition-all duration-300 ease-in-out rounded-2xl h-auto bg-slate-100 hide-scrollbar mt-2"
                            >
                                <div className="flex flex-col space-y-2">
                                    {menu.data
                                        .filter(menuItem => menuItem.mainmenu === mainMenuItem.id)
                                        .map(menuItem => (
                                            <button
                                                key={menuItem.id}
                                                className="p-4 text-sm leading-normal text-blue-gray-500/80 bg-slate-200 rounded-xl mb-2 flex justify-center items-center"
                                                onClick={() => {
                                                    setChosenCategory(menuItem.id);
                                                    setChosenWindow(2);
                                                }}
                                            >
                                                {menuItem.name}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                className="button p-2 w-1/3"
                // onClick={() => navigate(-1)}
                onClick={() => window.location.href = '/'}
            >
                Back
            </button>
        </>
    );
};

export default MenuLayout1;
