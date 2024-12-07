// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { AbstraxionProvider } from "@burnt-labs/abstraxion";
// // import "@burnt-labs/abstraxion/dist/index.css";
// // import "@burnt-labs/ui/dist/index.css";
// import { Buffer } from "buffer";

// // Polyfill Buffer for compatibility
// (window as any).Buffer = Buffer;

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <AbstraxionProvider
//       config={{
//         contracts: ["xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka"],
//       }}
//     >
//       <App />
//     </AbstraxionProvider>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
// import "@burnt-labs/abstraxion/dist/index.css";
// import "@burnt-labs/ui/dist/index.css";
import { Buffer } from "buffer";

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
        contracts: ["xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka"],
      }}
    >
      <App />
    </AbstraxionProvider>
  </React.StrictMode>
);
