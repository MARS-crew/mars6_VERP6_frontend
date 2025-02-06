import React, { useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";

import StateButton from "../../stateButton/StateButton";
import StateSelectModal from "../../stateButton/StateSelectModal";

function RequestList({ no, title, state, date, writer, open,content }) {
  const [modalState, setModalState] = useState(false);
  const [selectModal, setSelectModal] = useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleSelectStateModal = () => {
    setSelectModal(!selectModal);
  };
  return (
    <div className="w-[582px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg">
      <div className="h-6 flex place-content-between items-center ml-[30px] mr-[25px] text-[15px] ">
        <div className="w-[5%] text-[#8E98A8] font-medium">{no}1</div>
        <div className="text-center">{title}asdkjsakjas.ppt</div>
        <div>
          <StateButton onClick={handleSelectStateModal} state="REQUESTED"/>
          {selectModal ? <StateSelectModal /> : null}
        </div>

        <div>{writer}</div>
        <div className="text-center">{date}</div>
        <img src={DownloadIcon} />
      </div>
      {modalState ? (
        <div className="mx-[21px] mt-[21px]">
          <div className="flex mb-[9px]">
            <img src={DescriptionIcon} />
            <div className="ml-2 font-normal text-[15px]">작업 내역</div>
          </div>
          <div className="w-[527px] h-[151px] border border-[#8E98A8] rounded-lg p-4">
            {content}
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

export default RequestList;
