import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="w-full border-b h-[80px] flex justify-center bg-white">
      <div className="w-full max-w-[1194px] h-full flex items-center justify-between">
        <div
          onClick={(e) => {
            e.preventDefault();
            navigate("/detail-page");
          }}
          className="text-[32px] text-[#8E98A8] font-semibold"
        >
          VER6
        </div>
        <div className="font-light text-[16px]">chhari0708</div>
      </div>
    </div>
  );
}

export default Header;
