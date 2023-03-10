import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss";
import { HabitsProvider } from "./hooks/useHabits";
import { VarsProvider } from "./hooks/useVars";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VarsProvider>
      <HabitsProvider>
        <App />
      </HabitsProvider>
    </VarsProvider>
  </React.StrictMode>
);
