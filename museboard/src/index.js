import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useOutletContext } from "react-router-dom";
import App from './App';
import Imagegrid from './components/Imagegrid';
import Error from './components/Error';
import './index.css';
import Explore from './components/Explore';
import AddPost from './components/AddPost';
import '@fontsource/roboto';

function ImageGridWrapper() {
  const { newImage } = useOutletContext();
  return <Imagegrid newImage={newImage} />;
}

function AddPostWrapper() {
  const { setNewImage } = useOutletContext();
  return <AddPost onUpload={setNewImage} />;
}



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",   
        element: <ImageGridWrapper />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/add",
        element: <AddPostWrapper/>,
      },
    ],
    errorElement: <Error />,  
  },
]);

// Render RouterProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
