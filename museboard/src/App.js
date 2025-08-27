import React,{ useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Imagegrid from "./components/Imagegrid";
// import AddPost from "./components/AddPost";

const App = () => {
  const [newImage, setNewImage] = useState(null);
  return (
    <div>
      <Sidebar />
      <div className="ml-20">
      <Navbar />
      <Outlet context={{ newImage, setNewImage }}/>
    </div>
    </div>
  );
};

export default App;


