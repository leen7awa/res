import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatingPage from "./pages/Seating";
import MenuPage from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function App() {
  const [seatOption, setSeatOption] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleSelectOption = (option) => {
    setSeatOption(option);
  };

  const addItemToCart = (itemDetails, checkedExtras, inputValue) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        itemDetails,
        extras: checkedExtras,
        customText: inputValue
      }
    ]);
  };

  // Load cart items from localStorage if available
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    
    // If no saved cart items, consider it the user's first visit and set the cart as empty
    if (!savedCartItems) {
      localStorage.setItem('firstVisit', 'true');
      setCartItems([]); // Initialize the cart as empty on first visit
    } else {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (localStorage.getItem('firstVisit') === 'false' || cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('firstVisit', 'false'); // Mark that it's no longer the first visit
    }
  }, [cartItems]);

  return (
    <>
      <Header />
      <Router>
        <div className="h-screen bg-cover bg-center flex justify-center items-center w-full bg-slate-600">
          <Routes>
            <Route path="/" element={<SeatingPage onSelectOption={handleSelectOption} />} />
            <Route path="/menu" element={<MenuPage addItemToCart={addItemToCart} cartItems={cartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
