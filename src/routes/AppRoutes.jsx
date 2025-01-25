import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "../pages/index";
import Papers from "../pages/page-paperlist";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Test />} />
    <Route path="/paper" element={<Papers />} />
  </Routes>
);

export default AppRoutes;
