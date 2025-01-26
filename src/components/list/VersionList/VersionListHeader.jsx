import React from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";

function VersionListHeader() {
  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex place-content-between items-center ml-[23px] mr-[109px] text-[15px]">
        <div className="font-medium">번호</div>
        <div className="w-[23%] text-center font-medium">버전</div>
        <div className="w-[15%] text-center">작업물</div>
        <div className="w-[18%] text-center flex justify-end">
          <p>날짜</p>
          <img src={AlignDownIcon} />
        </div>
      </div>
    </div>
  );
}

export default VersionListHeader;
