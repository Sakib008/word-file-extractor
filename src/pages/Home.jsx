import api from "../utils/api";
import { useFileContext } from "../context/fileContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const { state, dispatch, getFileList } = useFileContext();
  const [selectedFile, setFile] = useState(null);
  const { loading } = state;
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
  }, []);
  const handleChange = (e) => {
    try {
      e.preventDefault();
      const selectedFile = e.target.files[0];
      console.log("selected file : ", selectedFile);
      setFile(selectedFile);
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_FILE", payload: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await api.post("/document", formData);
      if (res.status === 200) {
        dispatch({ type: "SET_FILE", payload: res });
      }
      console.log(res);
    } catch (error) {
      console.error("Error: ", error);
      console.error("Error message : ", error.response.data.message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      setFile(null);
    }
  };

  console.log("state : ", state.file);
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold m-4">Upload a file</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-sm border-2 rounded-xl p-4 border-blue-500"
        >
          <input
            type="file"
            onChange={handleChange}
            placeholder="Choose File"
            className="border-2 rounded-xl p-4 my-4 border-blue-500"
          />
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl ${
              loading && "cursor-not-allowed bg-blue-200"
            }`}
            disabled={loading}
          >
            Upload
          </button>
        </form>
      </div>
      <div className="flex flex-wrap gap-4 my-4 items-center justify-center">
        {!loading &&
          state.file.map((doc) => (
            <Link
              to={`/document/${doc?.id}`}
              className="rounded-2xl border-blue-500 border-2 p-1 "
              key={doc?.id}
            >
              <img
                src={doc?.images[0]?.url}
                alt="file"
                className="w-64 rounded-2xl h-64 object-cover"
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
