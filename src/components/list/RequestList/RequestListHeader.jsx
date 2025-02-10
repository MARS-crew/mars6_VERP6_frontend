import React, { useEffect, useState } from "react";
import AlignDownIcon from "../../../assets/svg/AlignDown.svg";
import filterIcon from "../../../assets/svg/filter.svg";
import StateFilterSelectModal from "../../stateButton/StateFilterSelectModal";


function RequestListHeader({ filterState, setFilterState }) {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (newState) => {
    setFilterState(newState);
    setShowFilter(false);
  };
  
  useEffect(() => {
  }, [filterState]);

  return (
    <div className="w-[582px] h-[50px] bg-[#8E98A8] text-white rounded-lg pt-[13px] mb-2">
      <div className="flex place-content-between items-center ml-[22px] mr-[89px] text-[15px]">
        <div className="font-medium">번호</div>
        <div className="w-[17%] text-center">작업물</div>
        <div className="relative">
          <button onClick={toggleFilter} className="flex items-center">
            <img src={filterIcon} className="mr-1" />
            {/* <p>{filterState || "상태"}</p> */}
            <p>{filterState ? filterState : "전체"}</p>
          </button>
          {showFilter && (
            <div className="absolute left-0 top-6 z-50">
              <StateFilterSelectModal onStateChange={handleFilterChange} />
            </div>
          )}
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
