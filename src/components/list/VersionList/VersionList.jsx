import React, { useEffect, useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";
import useGetDownloadFile from "../../../hooks/File/useGetDownloadFile";
import CopyIcon from "../../../assets/svg/Copy.svg";
import StateButton from "../../stateButton/StateButton";
import { formatDate } from "../../../utils/formatDate";

function VersionList({ position, item, index, onClick }) {
  const [modalState, setModalState] = useState(false);

  // const downloadFile =
  //   item.fileName && !item.fileName.startsWith("http")
  //     ? useGetDownloadFile(item.docId)
  //     : { data: null, isLoading: false, error: null };

  // console.log(downloadFile.data.data);

  const handleModal = () => {
    setModalState(!modalState);
  };

  return (
    <div
      className="w-[582px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg mb-[2px]"
      onClick={() => {
        if (onClick) onClick(item);
      }}
    >
      <div className="h-6 flex items-center ml-[30px] text-[15px]">
        <div className="w-[20px] text-[#8E98A8] font-medium text-center mr-[26px]">
          {index + 1}
        </div>
        <div className="w-[60px] text-center font-medium mr-[46px]">
          V{item.version}
        </div>
        <div className="w-[170px] text-center truncate mr-[30px]">
          {item.fileName}
        </div>
        <div className="w-[75px] text-center mr-[30px]">
          {formatDate(item.createdAt, "short")}
        </div>
        <StateButton state="REQUESTED" />
      </div>
      {modalState ? (
        <div className="mx-[21px] mt-[21px]">
          <div className="flex mb-[9px]">
            <img src={DescriptionIcon} alt="Description" />
            <div className="ml-2 font-normal text-[15px]">작업 내역</div>
          </div>
          <div className="w-[527px] h-[151px] border border-[#8E98A8] rounded-lg p-4">
            {item.content}
          </div>
          <img
            onClick={handleModal}
            className="m-auto mt-[13px]"
            src={ArrowUpIcon}
            alt="Arrow Up"
          />
        </div>
      ) : (
        <img
          onClick={handleModal}
          className="m-auto mt-[17px]"
          src={ArrowDownIcon}
          alt="Arrow Down"
        />
      )}
    </div>
  );
}

export default VersionList;
