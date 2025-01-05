import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
const Modal = ({ isOpen, onClose, title, children, onConfirm, filename }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <HiOutlineXMark className="size-6 text-gray-500  cursor-pointer" />
          </button>
        </div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
