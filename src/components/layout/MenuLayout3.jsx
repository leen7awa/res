<div className="flex flex-col h-screen w-full px-4">
    {/* Top Section */}
    <div className="flex-shrink-0 justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold">{itemDetails.name} ₪{itemDetails.price}</h2>
        {showConfirmation && (
            <div className="mt-4 font-semibold items-center bg-green-100 flex flex-row rounded-2xl border border-green-500 text-green-700 px-8 py-2 justify-center" role="alert">
                <CheckIcon />
                <p className="text-sm ml-1">Item added to cart.</p>
            </div>
        )}
        <p className="text-lg md:text-xl mt-4">{itemDetails.desc}</p>
    </div>

    {/* Middle Section */}
    <div className="flex-wrap min-h-0 max-h-[400px] bg-slate-100 rounded-xl mt-4 overflow-hidden">
        {itemTosafot.length > 0 && (
            <>
                <div className="flex flex-row justify-between border-b-2 w-full font-semibold p-2">
                    <h3 className="text-xl">Extras</h3>
                    {checkedExtras.length > 0 && (
                        <button
                            className="border border-blue-950 px-2 rounded-2xl bg-slate-200"
                            onClick={handleClearExtras}
                        >
                            Clear extras
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap justify-center items-start max-h-[300px] mt-4 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                                            <p className="text-sm md:text-base">
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
        )}
    </div>

    {/* Bottom Section */}
    <div className="flex-1 mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <form className="mx-auto my-0">
                <div className="relative flex items-center">
                    <button
                        type="button"
                        id="decrement-button"
                        onClick={handleQuantityDecrement}
                        className="flex-shrink-0 bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center border border-gray-300 rounded-md h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    >
                        <MinusIcon />
                    </button>
                    <input
                        type="text"
                        id="counter-input"
                        value={quantity}
                        readOnly
                        className="text-black border-0 focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                    />
                    <button
                        type="button"
                        id="increment-button"
                        onClick={handleQuantityIncrement}
                        className="flex-shrink-0 bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center border border-gray-300 rounded-md h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    >
                        <PlusIcon />
                    </button>
                </div>
            </form>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
            <button
                className="button w-auto scale-90"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
            <button
                className="button bg-slate-500 hover:bg-slate-600 w-fit py-2 mt-2 sm:mt-0"
                onClick={() => setChosenWindow(2)}
            >
                Back
            </button>
        </div>
    </div>
</div>
