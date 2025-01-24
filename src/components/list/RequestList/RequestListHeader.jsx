import React from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";
import filterIcon from "../../../assets/svg/filter.svg";

function RequestListHeader() {
  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex place-content-between items-center ml-[22px] mr-[89px] text-[15px]">
        <div className="font-medium">번호</div>
        <div className="w-[17%] text-center">작업물</div>
        <div className="flex">
          <img src={filterIcon} />
          <p>상태</p>
        </div>
        <div>작성자</div>
        <div className="text-center flex justify-end">
          <p>날짜</p>
          <img src={AlignDownIcon} />
        </div>
      </div>
    </div>
  );
}

export default RequestListHeader;
