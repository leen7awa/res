import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

const Seating = ({ onSelectOption }) => {
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    onSelectOption(option);
    navigate("/menu");
  };

  return (
    <div className="box">
      <h2 className="text-4xl font-bold">Select order type</h2>
      <div className="flex flex-col w-1/2 justify-center items-center mx-auto">
        <button
          id="takeaway-btn"
          className="button mt-4"
          onClick={() => handleOptionSelect("takeaway")}
        >
          Take away
        </button>
        <button
          id="seat-btn"
          className="button mt-2"
          onClick={() => handleOptionSelect("seat")}
        >
          Seat
        </button>
      </div>
    </div>
  );
};

export default Seating;
