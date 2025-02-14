import React, { useEffect, useState } from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";
import filterIcon from "../../../assets/svg/filter.svg";
import StateFilterSelectModal from "../../stateButton/StateFilterSelectModal";

const statusMap = {
  ALL: "전체",
  IN_PROGRESS: "진행중",
  PENDING: "대기",
  COMPLETED: "완료",
};


function RequestListHeader({ filterState, setFilterState, isReversed, setIsReversed }) {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (newState) => {
    setFilterState(newState);
    setShowFilter(false);
  };

  const toggleReverse = () => {
    setIsReversed((prev) => !prev);
  };


  useEffect(() => {
  }, [filterState]);

  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex place-content-between items-center ml-[22px] mr-[89px] text-[15px]">
        <div className="font-medium">번호</div>
        <div>담당자</div>
        <div className="w-[17%] text-center">요청제목</div>
        <div className="text-center flex justify-end" onClick={toggleReverse}>
          <p>날짜</p>
          <img 
            src={AlignDownIcon} 
            className={`transition-transform ${isReversed ? "rotate-180" : ""}`}
          />
        </div>
        <div className="relative">
          <button onClick={toggleFilter} className="flex items-center w-[70px]">
            <img src={filterIcon} className="mr-1" />
            {/* <p>{filterState || "상태"}</p> */}
            <p>{filterState ? statusMap[filterState] || "전체" : "전체"}</p>
          </button>
          {showFilter && (
            <div className="absolute left-0 top-6 z-50">
              <StateFilterSelectModal onStateChange={handleFilterChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestListHeader;
