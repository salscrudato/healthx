// src/components/PainTrackerReducer.js

export const initialState = {
    selectedPart: null,
    painLevels: {},      // { partKey: number }
    isModalOpen: false,
    tempPainLevel: 5,
    isSubmitting: false,
  
    // NEW: Store each selected entry in an array
    painHistory: [],
  };
  
  export function painTrackerReducer(state, action) {
    switch (action.type) {
      case "SELECT_PART":
        return {
          ...state,
          selectedPart: action.payload.partKey,
          tempPainLevel: state.painLevels[action.payload.partKey] || 5,
          isModalOpen: true,
        };
  
      case "CLOSE_MODAL":
        return {
          ...state,
          isModalOpen: false,
          selectedPart: null,
        };
  
      case "SET_TEMP_LEVEL":
        return {
          ...state,
          tempPainLevel: action.payload.level,
        };
  
      // On confirm, store new pain level & log the selection in painHistory
      case "CONFIRM_PAIN_LEVEL": {
        const { newLevel } = action.payload;
        const partKey = state.selectedPart;
  
        // Create a short date/time stamp:
        const timestamp = new Date().toLocaleString(); // e.g. "1/28/2025, 2:14 PM"
  
        // Add a new entry to painHistory
        const newEntry = {
          partKey,
          level: newLevel,
          timestamp,
        };
  
        return {
          ...state,
          painLevels: {
            ...state.painLevels,
            [partKey]: newLevel,
          },
          isModalOpen: false,
          selectedPart: null,
          painHistory: [...state.painHistory, newEntry],
        };
      }
  
      case "SUBMIT_START":
        return { ...state, isSubmitting: true };
  
      case "SUBMIT_SUCCESS":
        return { ...state, isSubmitting: false };
  
      case "SUBMIT_ERROR":
        return { ...state, isSubmitting: false };
  
      default:
        return state;
    }
  }