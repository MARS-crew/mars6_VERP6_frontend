import React, { useEffect, useState } from "react";
import DownloadIcon from "../../../assets/svg/Download.svg";
import ArrowDownIcon from "../../../assets/svg/ArrowDown.svg";
import ArrowUpIcon from "../../../assets/svg/ArrowUp.svg";
import DescriptionIcon from "../../../assets/svg/Description.svg";
import useGetDownloadFile from "../../../hooks/File/useGetDownloadFile";
import CopyIcon from "../../../assets/svg/Copy.svg";
import StateButton from "../../stateButton/StateButton";
import { formatDate } from "../../../utils/formatDate";
import VersionStatus from "../../stateButton/versionStatus";

function VersionList({ position, item, index, onClick }) {
  const [modalState, setModalState] = useState(false);
  const { getDownloadUrl } = useGetDownloadFile();
  const [downloadUrl, setDownloadUrl] = useState();
  const [statusModal, setStatusModal] = useState(false);

  useEffect(() => {
    fetchDownloadUrl();
  }, [item.docDetailId, item.fileName]);

  const fetchDownloadUrl = async () => {
    try {
      const response = await getDownloadUrl.mutateAsync({
        docDetailId: item.docDetailId,
        fileName: item.fileName,
      });
      setDownloadUrl(response.data.result.presignedUrl);
    } catch (error) {
      // console.error("다운로드 URL 요청 실패:", error);
    }
  };

  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleStatusModal = () => {
    setStatusModal(!statusModal);
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
          {item.fileName && item.fileName.startsWith("http") ? (
            <a href={`${item.fileName}`}>{item.fileName}</a>
          ) : (
            <a href={`${downloadUrl}`}>{item.fileName}</a>
          )}
        </div>
        <div className="w-[75px] text-center mr-[30px]">
          {formatDate(item.createdAt, "short")}
        </div>
        <StateButton onClick={handleStatusModal} state={item.status} />
        {statusModal ? (
          <VersionStatus
            docDetailId={item.docDetailId}
            setStatusModal={setStatusModal}
            statusModal={statusModal}
          />
        ) : null}
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
          <div className="mt-[20px]">
            <input
              className="w-[486px] h-[32px] border-b placeholder-[#d9d9d9] text-[14px] focus:outline-none mr-[11px]"
              placeholder="해당 상태에 대한 사유를 추가해주세요."
            />
            <button className="w-8 h-8 bg-[#8E98A8] text-white rounded-lg">
              +
            </button>
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
