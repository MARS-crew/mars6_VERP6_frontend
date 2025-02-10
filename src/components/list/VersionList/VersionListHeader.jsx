import React from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";
import AlignUpIcon from "../../../assets/svg/FilterUp.svg";

function VersionListHeader({ position, filter, setFilter }) {
  const filterState = () => {
    setFilter(!filter);
  };
  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex place-content-between items-center ml-[23px] mr-[109px] text-[15px]">
        <div className="flex items-center">
          {position == "leader" ? (
            <>
              <input
                type="checkbox"
                id="header_check"
                className="hidden peer"
              />
              <label
                htmlFor="header_check"
                className="w-[17px] h-[17px] border-2 border-white rounded flex items-center justify-center text-transparent peer-checked:bg-white peer-checked:text-[#8E98A8] cursor-pointer"
              >
                ✓
              </label>
            </>
          ) : null}
          <div className="font-medium ml-[3px]">번호</div>
        </div>

        <div className="w-[8%] text-center font-medium">버전</div>
        <div className="w-[30%] text-center">작업물</div>
        <div className="w-[18%] text-center flex justify-end">
          <p>날짜</p>
          <img
            onClick={filterState}
            src={filter ? AlignUpIcon : AlignDownIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default VersionListHeader;
