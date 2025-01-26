import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPageView from "../pages/mainPage";
import DetailPageView from "../pages/detailPage";
import LoginPageView from "../pages/loginPage";
import UpItemRow from "../components/list/PaperList/UpdatePaper";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPageView />} />
    <Route path="/detail-page" element={<DetailPageView />} />
    <Route path ="/login-page" element = {<LoginPageView />} />
  </Routes>
);

export default AppRoutes