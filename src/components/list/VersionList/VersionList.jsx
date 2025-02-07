import React, { useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";

function VersionList({ no, ver, title, date, position, item }) {
  const [modalState, setModalState] = useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  };

  return (
    <div className="w-[582px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg mb-[2px]">
      <div className="h-6 flex place-content-between items-center ml-[30px] mr-[25px] text-[15px] ">
        <div className="flex w-[5%] items-center">
          {position == "leader" ? (
            <>
              <input
                type="checkbox"
                id={`check_btn_${no}`}
                className="hidden peer"
              />
              <label
                htmlFor={`check_btn_${no}`}
                className="text-white w-[17px] h-[17px] border-2 border-[#8E98A8] rounded flex items-center justify-center peer-checked:bg-[#8E98A8] peer-checked:text-white cursor-pointer"
              >
                ✓
              </label>
            </>
          ) : null}
          <div className=" text-[#8E98A8] font-medium ml-[9px]">{}</div>
        </div>
        <div className="w-[10%] text-center font-medium">V{item.version}</div>
        <div className="w-[30%] text-center">{item.fileName}</div>
        <div className="text-center">{item.createdAt}</div>
        <img src={DownloadIcon} />
      </div>
      {modalState ? (
        <div className="mx-[21px] mt-[21px]">
          <div className="flex mb-[9px]">
            <img src={DescriptionIcon} />
            <div className="ml-2 font-normal text-[15px]">작업 내역</div>
          </div>
          <div className="w-[527px] h-[151px] border border-[#8E98A8] rounded-lg p-4">
            마이페이지 화면 작업 내용 - Description 작성 완료 - 오탈자 수정 완료
            관리 페이지 작업 내용 - 오탈자 및 이미지 변경 - ui 변경
          </div>
          <img
            onClick={handleModal}
            className="m-auto mt-[13px]"
            src={ArrowUpIcon}
          />
        </div>
      ) : (
        <img
          onClick={handleModal}
          className="m-auto mt-[17px]"
          src={ArrowDownIcon}
        />
      )}
    </div>
  );
}

export default VersionList;
