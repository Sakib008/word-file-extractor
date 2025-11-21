import { useFileContext } from "../context/fileContext.jsx";
import { useParams, Navigate } from "react-router-dom";

const DocumentList = () => {
  const { id } = useParams();
  const state = useFileContext();
  console.log("id : ", id);
  if (state.loading) {
    return <div>Loading...</div>;
  }
  const document = state.state.file.find((doc) => doc.id === id);
  if (!document) {
    return (
      <div className="h-[50vh] max-w-7xl mx-auto flex justify-center items-center text-xl md:text-4xl">
        Document not found
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto gap-4 flex flex-col">
      <div className="content p-6 text-center" dangerouslySetInnerHTML={{ __html: document.content }} ></div>
      
    </div>
  );
};

export default DocumentList;
