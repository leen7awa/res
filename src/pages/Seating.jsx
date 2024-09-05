import React from 'react';
import { useNavigate } from 'react-router-dom';
import TakeAwayIcon from '../icons/TakeAwayIcon';
import DineInIcon from '../icons/DineInIcon';
import './button.css';

const Seating = ({ onSelectOption }) => {
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    onSelectOption(option);
    navigate("/menu");
  };

  return (
    <div className="box">
      <h2 className="text-4xl font-semibold">Select order type</h2>
      <div className="flex flex-row w-fit justify-center items-center mx-auto gap-4">
        <button
          id="takeaway-btn"
          className="button text-black"
          onClick={() => handleOptionSelect("takeaway")}
        >
          <TakeAwayIcon/>Take Away
        </button>
        <button
          id="seat-btn"
          className="button text-black"
          onClick={() => handleOptionSelect("seat")}
        >
          <DineInIcon/>Seat
        </button>
      </div>
    </div>
  );
};

export default Seating;
