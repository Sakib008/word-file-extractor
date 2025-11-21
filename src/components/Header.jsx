import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className=" bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Word App</h1>
          <NavLink to="/" className="px-4 py-2 rounded-md hover:bg-blue-900">
            Upload
          </NavLink>
          
      </div>
    </nav>
  );
};

export default Header;
