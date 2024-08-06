import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import APPRouter from "./Router";
import AuthProvider from "./AuthContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <APPRouter />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
