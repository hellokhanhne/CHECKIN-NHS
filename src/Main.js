import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ListCheckIn from "./ListCheckIn";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/list" element={<ListCheckIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
