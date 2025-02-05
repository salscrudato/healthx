import React, { useReducer } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import { bodyPartsData } from "./bodyPartsData";
import BodyDiagram from "./BodyDiagram";
import PainModal from "./PainModal";
import { initialState, painTrackerReducer } from "./PainTrackerReducer";

function PainTracker() {
  const [state, dispatch] = useReducer(painTrackerReducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });

    try {
      await addDoc(collection(db, "painEntries"), {
        timestamp: new Date().toISOString(),
        painLevels: state.painLevels,
      });

      dispatch({ type: "SUBMIT_SUCCESS" });
      toast.success("Pain log saved successfully!");
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR" });
      toast.error("Error saving pain log.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Dashboard</span>
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
          Pain Tracker
        </h1>

        {/* Body Diagram */}
        <div className="flex justify-center mt-6">
          <BodyDiagram
            bodyParts={bodyPartsData}
            painLevels={state.painLevels}
            onClickPart={(partKey) => dispatch({ type: "SELECT_PART", payload: { partKey } })}
            getColor={(partKey, painLevel) => {
              const part = bodyPartsData.find(bp => bp.key === partKey);
              return part.getColor(painLevel);
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={state.isSubmitting}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 block mx-auto"
        >
          {state.isSubmitting ? "Saving..." : "Submit"}
        </button>

        {/* Local Pain Log */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Pain Log (Local)
          </h2>
          <ul className="list-disc pl-5">
            {Object.entries(state.painLevels).map(([key, level]) => {
              if (level > 0) {
                const partData = bodyPartsData.find((bp) => bp.key === key);
                return (
                  <li key={key} className="mb-2">
                    <strong>{partData?.label || key}:</strong> {level}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>

        {/* Detailed Pain History */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Detailed Pain History
          </h2>
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Date/Time</th>
                <th className="border p-2 text-left">Body Part</th>
                <th className="border p-2 text-left">Level</th>
              </tr>
            </thead>
            <tbody>
              {state.painHistory.map((entry, index) => {
                const partData = bodyPartsData.find((bp) => bp.key === entry.partKey);
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2">{entry.timestamp}</td>
                    <td className="border p-2">{partData?.label || entry.partKey}</td>
                    <td className="border p-2">{entry.level}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {state.isModalOpen && (
          <PainModal
            selectedPart={state.selectedPart}
            tempPainLevel={state.tempPainLevel}
            onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            onConfirm={(newLevel) =>
              dispatch({ type: "CONFIRM_PAIN_LEVEL", payload: { newLevel } })
            }
            onChangeLevel={(level) =>
              dispatch({ type: "SET_TEMP_LEVEL", payload: { level } })
            }
          />
        )}
      </div>
    </div>
  );
}

export default PainTracker;

// // src/components/PainTracker.js
// import React, { useReducer } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { db } from "../firebase";
// import { bodyPartsData } from "./bodyPartsData";
// import BodyDiagram from "./BodyDiagram";
// import PainModal from "./PainModal";
// import { initialState, painTrackerReducer } from "./PainTrackerReducer";

// function PainTracker() {
//   const [state, dispatch] = useReducer(painTrackerReducer, initialState);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     dispatch({ type: "SUBMIT_START" });

//     try {
//       await addDoc(collection(db, "painEntries"), {
//         timestamp: new Date().toISOString(),
//         painLevels: state.painLevels,
//       });

//       dispatch({ type: "SUBMIT_SUCCESS" });
//       toast.success("Pain log saved successfully!");
//     } catch (error) {
//       dispatch({ type: "SUBMIT_ERROR" });
//       toast.error("Error saving pain log.");
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Pain Tracker</h1>

//       <Link
//         to="/"
//         className="mb-4 text-blue-600 hover:text-blue-700 flex items-center"
//       >
//         <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//         </svg>
//         Back to Dashboard
//       </Link>

//       {/* Body Diagram */}
//       <div className="flex justify-center mt-6">
//         <BodyDiagram
//           bodyParts={bodyPartsData}
//           painLevels={state.painLevels}
//           onClickPart={(partKey) =>
//             dispatch({ type: "SELECT_PART", payload: { partKey } })
//           }
//           // Pass the getColor function to dynamically color parts based on pain level
//           getColor={(partKey, painLevel) => {
//             const part = bodyPartsData.find(bp => bp.key === partKey);
//             return part.getColor(painLevel);
//           }}
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={state.isSubmitting}
//         className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700"
//       >
//         {state.isSubmitting ? "Saving..." : "Submit"}
//       </button>

//       {/* Local Pain Log List */}
//       <div className="mt-6 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-2 text-gray-800">Pain Log (Local)</h2>
//         <ul className="list-disc pl-5">
//           {Object.entries(state.painLevels).map(([key, level]) => {
//             if (level > 0) {
//               const partData = bodyPartsData.find((bp) => bp.key === key);
//               return (
//                 <li key={key} className="mb-2">
//                   <strong>{partData?.label || key}:</strong> {level}
//                 </li>
//               );
//             }
//             return null;
//           })}
//         </ul>
//       </div>

//       {/* Detailed Pain History */}
//       <div className="mt-6 bg-white p-4 rounded-lg shadow overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-2 text-gray-800">Detailed Pain History</h2>
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border p-2 text-left">Date/Time</th>
//               <th className="border p-2 text-left">Body Part</th>
//               <th className="border p-2 text-left">Level</th>
//             </tr>
//           </thead>
//           <tbody>
//             {state.painHistory.map((entry, index) => {
//               const partData = bodyPartsData.find(
//                 (bp) => bp.key === entry.partKey
//               );
//               return (
//                 <tr key={index} className="hover:bg-gray-100">
//                   <td className="border p-2">{entry.timestamp}</td>
//                   <td className="border p-2">{partData?.label || entry.partKey}</td>
//                   <td className="border p-2">{entry.level}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {state.isModalOpen && (
//         <PainModal
//           selectedPart={state.selectedPart}
//           tempPainLevel={state.tempPainLevel}
//           onClose={() => dispatch({ type: "CLOSE_MODAL" })}
//           onConfirm={(newLevel) =>
//             dispatch({ type: "CONFIRM_PAIN_LEVEL", payload: { newLevel } })
//           }
//           onChangeLevel={(level) =>
//             dispatch({ type: "SET_TEMP_LEVEL", payload: { level } })
//           }
//         />
//       )}
//     </div>
//   );
// }

// export default PainTracker;