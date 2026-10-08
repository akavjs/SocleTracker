import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Debug: afficher une erreur si React ne se charge pas
try {
  const root = document.getElementById("root");
  if (!root) {
    document.body.innerHTML = '<div style="padding:40px;color:red;font-family:sans-serif;">❌ Erreur: élément #root introuvable</div>';
  } else {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  document.body.innerHTML = `<div style="padding:40px;color:red;font-family:sans-serif;">❌ Erreur React: ${error}</div>`;
  console.error("Erreur React:", error);
}
