import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmailProvider, useEmail } from "./context/EmailContext";
import { PuffLoader } from "react-spinners";
import EmailModal from "./components/EmailModal";
import Navbar from "./components/Navbar";
import SidebarLayout from "./components/SidebarLayout";

const Home = lazy(() => import("./pages/Home"));
const Project = lazy(() => import("./pages/Project"));
const EditTranscript = lazy(() => import("./pages/EditTranscript"));
const Configuration = lazy(() => import("./pages/Configuration"));
const AccountSettings = lazy((a) => import("./pages/AccountSettings"));
const Error404 = lazy(() => import("./pages/Error404"));
const Upload = lazy(() => import("./pages/Upload"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    element: <SidebarLayout />,
    children: [
      {
        path: "/project/:slug", // Use `:slug` instead of `:projectId`
        element: <Project />,
      },
      {
        path: "/project/:slug/edit-transcript",
        element: <EditTranscript />,
      },
      {
        path: "/configuration",
        element: <Configuration />,
      },
      {
        path: "/account-settings",
        element: <AccountSettings />,
      },
      {
        path: "/project/:slug/upload", // Use `:slug` instead of `:projectId`
        element: <Upload />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

const EmailModalBlockedContent = () => {
  const { email, loading, userId, sessionId } = useEmail();

  if (loading) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" ,minHeight: "100vh", alignItems: "center",minWidth: "100vw"}}>
        <PuffLoader
          color="#7E22CE"
          cssOverride={null}
          loading
          size={59}
          speedMultiplier={1}
        />
        </div>
      </>
    );
  }

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <EmailProvider>
      <Suspense
        fallback={
          <div style={{ display: "flex", justifyContent: "center" ,minHeight: "100vh", alignItems: "center",minWidth: "100vw"}}>
        <PuffLoader
          color="#7E22CE"
          cssOverride={null}
          loading
          size={59}
          speedMultiplier={1}
        />
        </div>
        }
      >
        <EmailModalBlockedContent />
      </Suspense>
    </EmailProvider>
  );
}

export default App;
