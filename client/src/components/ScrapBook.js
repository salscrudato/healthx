import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AddMemoryModal from './AddMemoryModal';
import MemoryCard from './MemoryCard';
import { fetchMemories } from '../services/firebaseService';
import downloadPDF from '../utils/pdfExport';

export default function ScrapBook() {
  const scrapbookId = 'publicScrapbook';
  const [memories, setMemories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchMemories(scrapbookId).then((data) => setMemories(data));
  }, [scrapbookId]);

  const handleMemoryAdded = (newMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
    setShowAddModal(false);
  };

  const handleMemoryDeleted = (deletedId) => {
    setMemories((prev) => prev.filter((m) => m.id !== deletedId));
  };

  const handleDownloadPDF = () => {
    downloadPDF(memories);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Return to Dashboard Link */}
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Return to Dashboard</span>
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          My Journal
        </h1>
  
        {/* Add Memory Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          Add Photo or Memory
        </button>

        {showAddModal && (
          <AddMemoryModal
            scrapbookId={scrapbookId}
            onMemoryAdded={handleMemoryAdded}
            onClose={() => setShowAddModal(false)}
            className="transition-all duration-300 ease-in-out"
          />
        )}

        {/* Memory Cards */}
        <div className="mt-8 space-y-6">
          {memories.length > 0 ? (
            memories.map((memory) => (
              <div key={memory.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <MemoryCard
                  memory={memory}
                  scrapbookId={scrapbookId}
                  onDelete={handleMemoryDeleted}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No entries yet. Add your first memory above to get started.
            </p>
          )}
        </div>

        {/* PDF Export Button (only if there are memories) */}
        {memories.length > 0 && (
          <button
            onClick={handleDownloadPDF}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700"
          >
            Download Journal (PDF)
          </button>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import AddMemoryModal from './AddMemoryModal';
// import MemoryCard from './MemoryCard';
// import { fetchMemories } from '../services/firebaseService';
// import downloadPDF from '../utils/pdfExport';

// export default function ScrapBook() {
//   const scrapbookId = 'publicScrapbook';
//   const [memories, setMemories] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);

//   // Ensure we fetch the latest memories
//   useEffect(() => {
//     fetchMemories(scrapbookId).then((data) => setMemories(data));
//   }, [scrapbookId]);

//   const handleMemoryAdded = (newMemory) => {
//     setMemories((prev) => [newMemory, ...prev]);
//     setShowAddModal(false);
//   };

//   const handleMemoryDeleted = (deletedId) => {
//     setMemories((prev) => prev.filter((m) => m.id !== deletedId));
//   };

//   const handleDownloadPDF = () => {
//     downloadPDF(memories);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         {/* Return to Dashboard Link */}
//         <Link
//           to="/"
//           className="mb-4 text-blue-600 hover:text-blue-700 flex items-center"
//         >
//           <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//           </svg>
//           Return to Dashboard
//         </Link>
  
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
//           My Journal
//         </h1>
  
//         {/* Add Memory Button */}
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700"
//         >
//           Add Photo or Memory
//         </button>
  
//         {/* Add Memory Modal */}
//         {showAddModal && (
//           <AddMemoryModal
//             scrapbookId={scrapbookId}
//             onMemoryAdded={handleMemoryAdded}
//             onClose={() => setShowAddModal(false)}
//             className="transition-all duration-300 ease-in-out"
//           />
//         )}
  
//         {/* Memory Cards */}
//         <div className="mt-8 space-y-6">
//           {memories.length > 0 ? (
//             memories.map((memory) => (
//               <div key={memory.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300">
//                 <MemoryCard
//                   memory={memory}
//                   scrapbookId={scrapbookId}
//                   onDelete={handleMemoryDeleted}
//                 />
//                 {/* Delete Icon */}
//                 {/* <button className="text-red-500 hover:text-red-700 self-end" onClick={() => handleMemoryDeleted(memory.id)}>
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button> */}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">
//               No entries yet. Add your first memory above to get started.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }