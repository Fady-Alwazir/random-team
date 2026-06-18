import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.modue.css";
import reportWebVitals from "./reportWebVitals";
import { TeamsProvider } from "./context/TeamsContext";
import { MatchHistoryProvider } from "./context/MatchHistoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TeamsProvider>
      <MatchHistoryProvider>
        <App />
      </MatchHistoryProvider>
    </TeamsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
