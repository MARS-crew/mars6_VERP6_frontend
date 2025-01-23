import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPageView from "../pages/mainPage";
import DetailPageView from "../pages/detailPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPageView />} />
    <Route path="/detail-page" element={<DetailPageView />} />
  </Routes>
);

export default AppRoutes;
