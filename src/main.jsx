import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: { main: "#1d4ed8" },
    secondary: { main: "#2563eb" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: { fontFamily: '"Inter", sans-serif', button: { textTransform: "none", fontWeight: 600 } },
  shape: { borderRadius: 10 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
