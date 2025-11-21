export const initialState = {
  file: [],
  loading: false,
};

const fileReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...state,
        file: [...state.file, action.payload.data],
      };
    case "SET_FILE_LIST":
      return {
        ...state,
        file: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default fileReducer;
