import React, { useState } from 'react';
import Modal from 'react-modal';
import { saveMemory } from '../services/firebaseService';

Modal.setAppElement('#root');

export default function AddMemoryModal({ scrapbookId, onMemoryAdded, onClose }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAddDisabled = !content.trim() && !file;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scrapbookId || isAddDisabled) return;

    setLoading(true);
    try {
      const newMemory = await saveMemory({ scrapbookId, content, file });
      onMemoryAdded(newMemory);  // triggers the parent's setMemories
    } catch (error) {
      console.error('Error saving memory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Add Memory Modal"
      className="bg-white p-6 rounded-lg max-w-md mx-auto mt-24 focus:outline-none shadow-lg relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Photo or Memory</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Photo (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded p-1 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="memoryText">
            Your Memory:
          </label>
          <textarea
            id="memoryText"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write about one of your favorite memories or something that makes you happy…"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isAddDisabled || loading}
            className={`py-2 px-4 rounded text-white 
              ${isAddDisabled || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Saving...' : 'Add Memory'}
          </button>
        </div>
      </form>
    </Modal>
  );
}