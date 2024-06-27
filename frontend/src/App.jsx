import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
const Project = lazy(() => import("./pages/Project"));
const EditTranscript = lazy(() => import("./pages/EditTranscript"));
const Configuration = lazy(() => import("./pages/Configuration"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const Error404 = lazy(()=>import ("./pages/Error404"))
const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/project",
    element: <Project/>,
  },
  {
    path: "/edit-transcript",
    element: <EditTranscript/>,
  },
  {
    path: "/configuration",
    element: <Configuration/>,
  },
  {
    path: "/account-settings",
    element: <AccountSettings/>,
  },
  {
    path: "*",
    element: <Error404/>,
  },
]);
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      
     <RouterProvider router={BrowserRouter} />
      </Suspense>
    </>
 
  );
}

export default App;
