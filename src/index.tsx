import ReactDOM from "react-dom/client";
import App from "./routes/index";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import "tailwindcss/tailwind.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";

const QueryProvider = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={QueryProvider}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
