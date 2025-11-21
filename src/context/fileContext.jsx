import { createContext, useReducer, useContext } from "react";
import fileReducer, { initialState } from "../reducer/fileReducer";
import api from "../utils/api";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);
  const getFileList = async () => {
    try{
      const res = await api.get("/document");
      dispatch({ type: "SET_FILE_LIST", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteFile = async (id) => {
    try {
      const res = await api.delete(`/document/${id}`);
      console.log(" delete res : ", res);
      if (res.status === 200) {
        getFileList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FileContext.Provider value={{ state, dispatch,deleteFile, getFileList }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
