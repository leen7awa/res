import React, { useState } from "react";
import BackIcon from "../../icons/BackIcon";
import CashIcon from "../../icons/CashIcon";
import ApplePayIcon from "../../icons/ApplePayIcon";
import VisaIcon from "../../icons/VisaIcon";
import UserIcon from "../../icons/UserIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import '../../pages/button.css';


const Checkout = ({ setActiveTab }) => {
    const [paymentMethod, setPaymentMethod] = useState("");

    return (
        <>
            <div className="box mt-24 shadow-2xl shadow-blue-900">
                <div className="flex justify-between items-start">
                    <button className="self-start border-2 border-black px-4 rounded-2xl"
                        onClick={() => { setActiveTab('cart') }}>
                        <BackIcon />
                    </button>
                    <h2 className="ml-[80px] text-4xl font-bold text-blue-700 mb-6 mx-auto">
                        Payment Method
                    </h2>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-row items-center w-80 gap-2">
                        <UserIcon className="mr-2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Name"
                            className="border-b-2 rounded-none text-lg pl-2 w-full focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center w-80 gap-2">
                    <PhoneIcon className="mr-2 text-blue-500" />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border-b-2 rounded-none text-lg pl-2 w-full focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                </div>
                </div>


                <div className="flex flex-row  w-[100%] justify-center items-center mx-auto gap-4 rounded-none px-2">
                    <button
                        id="takeaway-btn"
                        className="button bg-blue-400"
                        onClick={() => {
                            setPaymentMethod("applepay")
                        }}
                    >
                        <ApplePayIcon />
                    </button>
                    <button
                        id="takeaway-btn"
                        className="button bg-blue-400"
                        onClick={() => {
                            setPaymentMethod("cash")
                        }}
                    >
                        <CashIcon />
                    </button>
                    <button
                        id="seat-btn"
                        className="button bg-blue-400"
                        onClick={() => setPaymentMethod("visa")}
                    >
                        <VisaIcon />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;