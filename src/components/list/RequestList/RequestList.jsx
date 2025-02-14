import React, { useEffect, useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";

import StateButton from "../../stateButton/StateButton";
import StateSelectModal from "../../stateButton/StateSelectModal";
import { useRequestStatus } from "../../../hooks/useRequestStatusUpdate";

function RequestList({ no, retitle, state:initialState, date, worker,content,reqId }) {
  const [modalState, setModalState] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [state, setState] = useState(initialState); // 상태 관리 추가
  const { updateStatus } = useRequestStatus({ reqId }); // useRequestStatus 추가

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleSelectStateModal = () => {
    setSelectModal(!selectModal);
  };

  const handleStateChange = async (newState) => {
    setState(newState);
    setSelectModal(false); // 선택 후 모달 닫기

    await updateStatus.mutateAsync(newState); //상태 업데이트
  };

  return (
    <div className="w-[582px] bg-white rounded-lg items-center justify-center pt-[22px] drop-shadow-lg mb-[2px]">
      <div className="h-6 flex place-content-between items-center ml-[20px] mr-[25px] text-[15px] ">
        <div className="w-[5%] text-[#8E98A8] font-medium ml-[10px]">{no + 1}</div>
        <div className="ml-[20px]">{worker}</div>{/* 담당자(작업자) */}
        <div
          className="text-center truncate"
          style={{ width: "120px", maxWidth: "120px" }}
          title={retitle}
        >
          { retitle }
        </div>
        <div className="text-center mr-[10px]">{date}</div>
        <div className="mr-[50px]">
          <StateButton onClick={handleSelectStateModal} state={state} showAll={true} />
          {selectModal ? (
            <StateSelectModal onStateChange={handleStateChange} />
          ) : null}
        </div>
      </div>
      {modalState ? (
        <div className="mx-[21px] mt-[21px]">
          <div className="flex mb-[9px]">
            <img src={DescriptionIcon} />
            <div className="ml-2 font-normal text-[15px]">요청 사항</div>
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
