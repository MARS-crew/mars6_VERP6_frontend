import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPageView from "../pages/mainPage";
import DetailPageView from "../pages/detailPage";
import LoginPageView from "../pages/loginPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPageView />} />
    <Route path="/detail-page" element={<DetailPageView />} />
    <Route path = "/main" element = {<MainPageView />} />
  </Routes>
);

export default AppRoutes;
