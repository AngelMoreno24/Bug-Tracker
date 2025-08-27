import React from "react";

const Modal = ({ title, children, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-black/20"></div> {/* overlay */}
            <div className="relative bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md z-10">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <div className="flex justify-end gap-2 mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onSave}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
  );
};

export default Modal;