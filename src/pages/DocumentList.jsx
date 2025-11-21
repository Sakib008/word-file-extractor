import { ArrowLeftCircle } from "lucide-react";
import { useFileContext } from "../context/fileContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DocumentList = () => {
  const { id } = useParams();
  const { state, dispatch, getFileList, deleteFile } = useFileContext();
  const navigate = useNavigate();
  console.log("id : ", id);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      if (state.file.length === 0) {
        getFileList();
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.file.length]);

  const handleDelete = async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await deleteFile(id);
      getFileList();
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  if (state.loading) {
    return <div>Loading...</div>;
  }
  const document = state.file.find((doc) => doc.id === id);
  console.log("Loading : ", state.loading);
  if (!document && !state.loading) {
    return (
      <div className="h-[50vh] max-w-7xl mx-auto flex justify-center items-center text-xl md:text-4xl">
        Document not found
      </div>
    );
  }
  console.log("2 nd loading : ", state.loading);
  return (
    <div className="max-w-7xl mx-auto gap-4 flex flex-col">
      <div className="flex justify-between m-3">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-xl flex bg-blue-500"
        >
          <ArrowLeftCircle /> Back{" "}
        </button>
        <button
          onClick={() => handleDelete(document.id)} 
          className="p-2 bg-blue-500 rounded-xl"
          disabled={state.loading}
        >
          Delete
        </button>
      </div>
      <div
        className="content p-6 text-center"
        dangerouslySetInnerHTML={{ __html: document.content }}
      ></div>
    </div>
  );
};

export default DocumentList;
