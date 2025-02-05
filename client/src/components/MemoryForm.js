import React, { useState } from 'react';
import { saveMemory } from '../services/firebaseService';

const prompts = [
  "What's something you're grateful of right now?",
  "What’s a moment that made you feel truly happy?",
  "What’s your favorite childhood memory?",
  "What's a TV Show or Movie you like?",
];

export default function MemoryForm({ scrapbookId, onMemoryAdded }) {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scrapbookId) return; // Ensures we have a valid ID

    setLoading(true);
    try {
      const newMemory = await saveMemory({
        scrapbookId,
        content,
        file,
      });
      onMemoryAdded(newMemory);
      // Reset the form
      setSelectedPrompt('');
      setContent('');
      setFile(null);
    } catch (err) {
      console.error('Error saving memory:', err);
    }
    setLoading(false);
  };

  const handlePromptSelect = (e) => {
    setSelectedPrompt(e.target.value);
    setContent(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded bg-gray-50 flex flex-col space-y-4"
      aria-label="Add a new journal entry"
    >
      {/* <label htmlFor="prompt" className="text-lg font-semibold">
        Choose a Prompt (Optional):
      </label>
      <select
        id="prompt"
        value={selectedPrompt}
        onChange={handlePromptSelect}
        className="p-2 border rounded"
      >
        <option value="">-- Select a Prompt --</option>
        {prompts.map((prompt) => (
          <option key={prompt} value={prompt}>
            {prompt}
          </option>
        ))}
      </select> */}

      <label htmlFor="fileInput" className="text-lg font-semibold">
        Upload a Photo:
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="p-2 border rounded"
      />

      <label htmlFor="memoryText" className="text-lg font-semibold">
        Your Memory:
      </label>
      <textarea
        id="memoryText"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="p-2 border rounded"
        placeholder="Write something here about the photo, or just write something you're grateful for!"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Add Memory'}
      </button>
    </form>
  );
}