import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EmailProvider } from "./context/EmailContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BreadcrumbProvider } from "./context/BreadCrumbContext.jsx";
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
<BreadcrumbProvider>
    <EmailProvider>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </EmailProvider>
</BreadcrumbProvider>
  </QueryClientProvider>
  </React.StrictMode>
);
