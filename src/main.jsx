import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { MyProvider } from "./lib/MyStore.jsx";
import ErrorBoundary from "./components/Error/ErrorBoundry.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ErrorBoundary>
        <MyProvider>
          <App />
        </MyProvider>
      </ErrorBoundary>
    </StrictMode>
  </BrowserRouter>
);
