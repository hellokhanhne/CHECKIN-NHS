import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ListCheckIn from "./ListCheckIn";
import TriemLam from "./TrienLam";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/check-in" element={<ListCheckIn />} />
        <Route path="/trien-lam" element={<TriemLam />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
