import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: "bypass",
    })
  )
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
      
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="container">
              <App />
              <ReactQueryDevtools position="bottom" />
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>,
    );
  });
