import React from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";
import AlignUpIcon from "../../../assets/svg/FilterUp.svg";

function VersionListHeader({ filter, setFilter }) {
  const filterState = () => {
    setFilter(!filter);
  };
  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex items-center text-[15px]">
        <div className="flex items-center">
          <div className="font-medium ml-[22px] mr-[38px]">번호</div>
        </div>

        <div className=" text-center font-medium mr-[123px]">버전</div>
        <div className="text-center mr-[111px]">작업물</div>
        <div className="text-center flex justify-end mr-[56px]">
          <p>날짜</p>
          <img
            onClick={filterState}
            src={filter ? AlignUpIcon : AlignDownIcon}
          />
        </div>
        <div className="text-center font-medium">상태</div>
      </div>
    </div>
  );
}

export default VersionListHeader;
