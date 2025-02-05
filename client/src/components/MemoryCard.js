// src/components/MemoryCard.js

import React, { useState } from 'react';
import { deleteMemory } from '../services/firebaseService';
import RemoveConfirmModal from './RemoveConfirmModal';
import { HiOutlineTrash } from 'react-icons/hi';

export default function MemoryCard({ memory, scrapbookId, onDelete }) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteMemory(scrapbookId, memory.id);
      onDelete(memory.id); // triggers the re-render
    } catch (error) {
      console.error('Error deleting memory:', error);
    } finally {
      setShowRemoveModal(false);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow p-4 transition-shadow duration-300">
      {/* Delete icon in top-right with a subtle background */}
      <button
        onClick={() => setShowRemoveModal(true)}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
        aria-label="Remove Memory"
      >
        <HiOutlineTrash className="text-red-500" size={20} />
      </button>

      {/* Lazy-loaded image if present */}
      {memory.imageUrl && (
        <img
          src={memory.imageUrl}
          alt={memory.content?.slice(0, 30) || 'User memory image'}
          className="w-full h-auto mb-2 rounded"
          loading="lazy"
        />
      )}

      {/* Memory content text */}
      {memory.content && (
        <p className="text-gray-800 mb-2" aria-label="Memory Content">
          {memory.content}
        </p>
      )}

      {/* Timestamp */}
      <small className="text-gray-400 block" aria-label="Date">
        {new Date(memory.timestamp).toLocaleString()}
      </small>

      {/* Confirmation Modal */}
      {showRemoveModal && (
        <RemoveConfirmModal
          isOpen={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

// import React, { useState } from 'react';
// import { deleteMemory } from '../services/firebaseService';
// import RemoveConfirmModal from './RemoveConfirmModal';
// import { HiOutlineTrash } from 'react-icons/hi';

// export default function MemoryCard({ memory, scrapbookId, onDelete }) {
//   const [showRemoveModal, setShowRemoveModal] = useState(false);

//   const handleConfirmDelete = async () => {
//     try {
//       await deleteMemory(scrapbookId, memory.id);
//       onDelete(memory.id); // triggers the re-render
//     } catch (error) {
//       console.error('Error deleting memory:', error);
//     } finally {
//       setShowRemoveModal(false);
//     }
//   };

//   return (
//     <div className="relative bg-white rounded-lg shadow p-4">
//       {/* Delete icon in top-right with a subtle background */}
//       <button
//         onClick={() => setShowRemoveModal(true)}
//         className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
//         aria-label="Remove Memory"
//       >
//         <HiOutlineTrash className="text-red-500" size={20} />
//       </button>

//       {memory.imageUrl && (
//         <img
//           src={memory.imageUrl}
//           alt={memory.content?.slice(0, 30) || 'User memory image'}
//           className="w-full h-auto mb-2 rounded"
//         />
//       )}

//       {memory.content && (
//         <p className="text-gray-800 mb-2" aria-label="Memory Content">
//           {memory.content}
//         </p>
//       )}

//       <small className="text-gray-400 block" aria-label="Date">
//         {new Date(memory.timestamp).toLocaleString()}
//       </small>

//       {/* Confirmation Modal */}
//       {showRemoveModal && (
//         <RemoveConfirmModal
//           isOpen={showRemoveModal}
//           onClose={() => setShowRemoveModal(false)}
//           onConfirm={handleConfirmDelete}
//         />
//       )}
//     </div>
//   );
// }