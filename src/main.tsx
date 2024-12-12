import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
// import "@burnt-labs/abstraxion/dist/index.css";
// import "@burnt-labs/ui/dist/index.css";
import { Buffer } from "buffer";
import { TREASURY } from "./utils/page";

// Extend the global window object to include Buffer
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Polyfill Buffer for compatibility
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AbstraxionProvider
      config={{
        ...TREASURY
      }}
    >
      <App />
    </AbstraxionProvider>
  </React.StrictMode>
);
