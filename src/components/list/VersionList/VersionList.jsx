import React, { useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";
import useGetDownloadFile from "../../../hooks/File/useGetDownloadFile";
import CopyIcon from "../../../assets/svg/Copy.svg";

function VersionList({ position, item, index,onClick }) {
  const [modalState, setModalState] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const downloadFile = useGetDownloadFile(353);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const Copy = (text) => {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  return (
    <div className="w-[582px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg mb-[2px]"
      onClick={() => {
        if (onClick) onClick(item);
      }}
    >
      <div className="h-6 flex place-content-between items-center ml-[30px] mr-[25px] text-[15px]">
        <div className="flex w-[5%] items-center">
          {position === "leader" ? (
            <>
              <input
                type="checkbox"
                id={`check_btn_${index}`}
                className="hidden peer"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={`check_btn_${index}`}
                className="text-white w-[17px] h-[17px] border-2 border-[#8E98A8] rounded flex items-center justify-center peer-checked:bg-[#8E98A8] peer-checked:text-white cursor-pointer"
              >
                ✓
              </label>
            </>
          ) : null}
          <div className="text-[#8E98A8] font-medium ml-[9px]">{index + 1}</div>
        </div>
        <div className="w-[10%] text-center font-medium">V{item.version}</div>
        <div className="w-[30%] text-center truncate">{item.fileName}</div>
        <div className="text-center">{item.createdAt}</div>
        {/* <a href={downloadFile.data.data.result} download={item.fileName}>
          <img src={DownloadIcon} alt="Download" />
        </a> */}
        {item.fileName && item.fileName.startsWith("http") ? (
          <img
            onClick={() => {
              Copy(item.fileName);
            }}
            src={CopyIcon}
            alt="copy"
          />
        ) : (
          <img src={DownloadIcon} alt="download" />
        )}
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
