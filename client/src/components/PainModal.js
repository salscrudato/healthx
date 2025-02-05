// PainModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function PainModal({ selectedPart, tempPainLevel, onClose, onConfirm, onChangeLevel }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        {/* Modal container */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Set Pain Level for {selectedPart}
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-lg font-medium text-gray-700">{tempPainLevel}</span>
            <input
              type="range"
              min={1}
              max={10}
              value={tempPainLevel}
              onChange={(e) => onChangeLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(tempPainLevel - 1) * 10}%, #E5E7EB ${(tempPainLevel - 1) * 10}%, #E5E7EB 100%)`
              }}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
              onClick={() => onConfirm(tempPainLevel)}
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default PainModal;