import React from 'react';
import Modal from 'react-modal';

export default function RemoveConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Remove Memory"
      className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-24 focus:outline-none shadow-lg relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-lg font-bold mb-4 text-gray-800">Remove Memory?</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to remove this memory from your scrapbook?
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </Modal>
  );
}