import React from "react";
import Header from "../../components/header/Header";
import AddDocument from "../../components/Button/AddDocument";

function MainPage() {
  return (
    <div className="bg-[#F6F6F6] w-full h-screen">
      <Header />
        <div className = "flex justify-center mt-[35px]">
          <AddDocument />
        </div>
    </div>
  );
}

export default MainPage;
