import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatingPage from "./pages/Seating";
import MenuPage from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [seatOption, setSeatOption] = useState("");

  const handleSelectOption = (option) => {
    setSeatOption(option);
  };

  return (
    <>
      <Header />
      <Router>
        <div className="h-screen bg-cover bg-center flex justify-center items-center w-full bg-slate-600">
          <Routes>
            <Route path="/" element={<SeatingPage onSelectOption={handleSelectOption} />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
