import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "../pages/index";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Test />} />
  </Routes>
);

export default AppRoutes;
