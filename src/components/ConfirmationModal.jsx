import React from "react";
import '../pages/windowMsg.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-buttons">
          <button
            className="button rounded w-fit px-8 py-2 bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="button rounded w-fit px-8 py-2"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
