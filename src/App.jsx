import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatingPage from "./pages/Seating";
import MenuPage from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";


// require('dotenv').config();
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


function App() {
  const [seatOption, setSeatOption] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleSelectOption = (option) => {
    setSeatOption(option);
  };

  const addItemToCart = (itemDetails, checkedExtras, inputValue, quantity) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        itemDetails,
        extras: checkedExtras,
        customText: inputValue,
        quantity
      }
    ]);
  };


  useEffect(() => {
    // console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <>
      <Header />
      <Router>
        {/* <div className="h-screen sm:h-auto md:h-screen bg-cover bg-center flex justify-center items-center w-full sm:w-auto md:w-full bg-slate-600"> */}
        <div className="h-screen sm:h-auto md:h-screen bg-cover bg-center flex justify-center items-center w-full sm:w-auto md:w-full bg-slate-600 pb-24">
          <Routes>
            <Route path="/" element={<SeatingPage onSelectOption={handleSelectOption} />} />
            <Route path="/menu" element={<MenuPage addItemToCart={addItemToCart} cartItems={cartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );

}

export default App;
