import React from "react";
import DownloadIcon from "../../assets/svg/Download.svg";
import ArrowDownIcon from "../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../assets/svg/ArrowUp.svg";

function VersionList({ no, ver, title, date, state }) {
  return (
    <div className="w-[582px] h-[86px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg">
      <div className="h-6 flex place-content-between items-center ml-[30px] mr-[25px] text-[15px] ">
        <div className="w-[5%] text-[#8E98A8] font-medium">{no}1</div>
        <div className="w-[10%] text-center font-medium">V{ver}0.1</div>
        <div className="w-[30%] text-center">{title}asdkjsakjas.ppt</div>
        <div className="text-center">{date}2025.01.01</div>
        <img src={DownloadIcon} />
      </div>
      {state == "open" ? (
        <img className="m-auto mt-[17px]" src={ArrowUpIcon} />
      ) : (
        <img className="m-auto mt-[17px]" src={ArrowDownIcon} />
      )}
    </div>
  );
}

export default VersionList;
