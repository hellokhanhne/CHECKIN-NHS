import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ListCheckIn from "./ListCheckIn";
import TriemLam from "./TrienLam";
import UserMage from "./UserMage";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />\
        <Route path="/check-in" element={<App />} />
        <Route path="/thong-ke" element={<ListCheckIn />} />
        <Route path="/trien-lam" element={<TriemLam />} />
        <Route path="/admin" element={<UserMage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
