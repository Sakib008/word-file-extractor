import { createContext, useReducer, useContext } from "react";
import fileReducer, { initialState } from "../reducer/fileReducer";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
