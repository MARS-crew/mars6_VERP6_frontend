// src/components/ItemRow.js
import React, { useState } from "react";
import MoreIcon from "../../../assets/images/more-icon.png";
import PencilIcon from "../../../assets/images/icon-pencil.png";
import { useNavigate } from "react-router-dom";
import AlertIcon from "../../../assets/svg/AlertIcon.svg";
import UpdateIcon from "../../../assets/svg/UpdateIcon.svg";
import DeletIcon from "../../../assets/svg/DeletIcon.svg";
import BellIcon from "../../../assets/images/bell-icon.png";
import useDocumentUpdate from "../../../hooks/useDocumentUpdate";
import useDocumentDelete from "../../../hooks/useDocumentDelete";
import ListDeleteModal from "../../Modal/ListDeleteModal";
import DocumentListInput from "../../Input/DocumentListInput";
import { useAlert } from "../../../hooks/usealertIcon";
import StateButton from "../../stateButton/StateButton";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/auth/auth";
import { createPortal } from "react-dom";
import useDocumentDetail from "../../../hooks/useDocumentDetail";

function ItemRow({ item, isLast, docTypeId, onRemove, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { updateDocument, isLoading: isUpdating } = useDocumentUpdate();
  const { deleteDocument, isLoading: isDeleting } = useDocumentDelete();
  const isempty = item.state;
  const auth = useRecoilValue(authState);
  const isTeamLeader = auth.user?.role === "TEAM_LEADER";

  // console.log('[Auth 상태 확인]', {
  //   auth,
  //   user: auth.user,
  //   role: auth.user?.role,
  //   isTeamLeader
  // });

  const docId = item.docId;
  const { data } = useAlert(docId);
  const alert = data ? data.result : false;
  // console.log(alert)
  // console.log("check :", data);
  const navigate = useNavigate();

  const { data: docDetailData } = useDocumentDetail(item.docId);
  const statusCounts = docDetailData?.data?.statusCounts || {
    PENDING: 0,
    CHECKED: 0,
    REJECTED: 0,
    APPROVED: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!item.docId) {
        alert("삭제할 문서가 존재하지 않습니다.");
        setShowDeleteModal(false);
        return;
      }

      console.log("[문서 삭제 시도]", {
        documentId: item.docId,
        documentName: item.name,
      });

      const response = await deleteDocument(item.docId);

      console.log("[문서 삭제 응답]", response);

      if (response.isSuccess) {
        alert(response.message || "문서가 성공적으로 삭제되었습니다.");
        onRemove(item.docId);
      } else {
        alert(response.message || "문서 삭제에 실패했습니다.");
      }

      setShowDeleteModal(false);
    } catch (error) {
      console.error("[문서 삭제 에러]", error);
      alert(
        error.response?.data?.message || "문서 삭제 중 오류가 발생했습니다."
      );
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleBlur = async () => {
    if (editValue.trim() && editValue !== item.name) {
      try {
        console.log("[문서 수정 시도]", {
          documentId: item.docId,
          currentTitle: item.name,
          newTitle: editValue,
          docTypeId: docTypeId,
        });

        const result = await updateDocument(item.docId, editValue, docTypeId);

        if (result.isSuccess) {
          console.log("[문서 수정 성공]", result);
          item.name = editValue;
          setIsEditing(false);
        } else {
          console.error("[문서 수정 실패]", result);
          setEditValue(item.name);
          setIsEditing(false);
        }
      } catch (error) {
        console.error("[문서 수정 에러]", error);
        setEditValue(item.name);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
      setEditValue(item.name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const shortenedFileLink =
    item.fileLink.length > 10
      ? `${item.fileLink.slice(0, 10)}...`
      : item.fileLink;

  const handleClick = () => {
    navigate(`/detail-page?docId=${item.docId}&title=${item.name}`);
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`mb-6 mt-[19px] pb-6 ${
          !isLast && "border-b border-[#B4B4B4]"
        } last:mb-0 mr-[20px]`}
      >
        {!item.state ? (
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-[200px] font-medium text-gray-700 text-[17px]">
              <div className="truncate">{item.name}</div>
            </div>
            <div className="flex-1 flex justify-center">
              <div onClick={handleClick} className="text-[#9CA2B3] text-[17px]">
                현재 등록되어 있는 요청이 없습니다.
              </div>
            </div>
            <div className="w-[200px] flex items-center gap-10 justify-end mr-[70px] text-[17px]">
              <button
                className="hover:text-gray-700"
                onClick={handleUpdateClick}
                disabled={isUpdating}
              >
                <span>
                  <img className="h-[20px] w-[20px]" src={UpdateIcon} />
                </span>
              </button>
              <button
                className="hover:text-gray-700"
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                <span>
                  <img className="h-[20px] w-[20px]" src={DeletIcon} />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-gray-700 flex text-[17px]">
                {isEditing ? (
                  <div className="w-[333px] relative">
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="w-[333px] h-[32px] text-[17px] pl-[6px] focus:outline-none"
                      autoFocus
                      disabled={isUpdating}
                    />
                    <div className="border-b border-[#D9D9D9]" />
                  </div>
                ) : (
                  <>
                    {item.name}
                    {alert ? (
                      <img
                        className="ml-[10px] mt-[5px] h-[16px]"
                        src={BellIcon}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div
                className="w-[150px] flex items-center text-black text-[20px] font-medium overflow-hidden"
                title={item.fileLink}
                onClick={handleClick}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap w-full">{item.fileLink}</span>
              </div>
              <span className="text-[20px]">{item.updated}</span>
              <div className="flex gap-10 items-center">
                {isTeamLeader ? (
                  <>
                    <StateButton state="APPROVED" count={statusCounts.APPROVED} />
                    <StateButton state="CHECKED" count={statusCounts.CHECKED} />
                    <StateButton state="PENDING" count={statusCounts.PENDING} />
                    <StateButton state="REJECTED" count={statusCounts.REJECTED} />
                  </>
                ) : (
                  <>
                    <StateButton state="PENDING" count={item.pendingRequestStep || 0} />
                    <StateButton state="IN_PROGRESS" count={item.inProgressRequestStep || 0} />
                    <StateButton state="COMPLETED" count={item.completedRequestStep || 0} />
                  </>
                )}
              </div>
              <div className="flex items-center gap-10 mr-[70px] text-[20px]">
                <button
                  className="hover:text-gray-700"
                  onClick={handleUpdateClick}
                  disabled={isUpdating}
                  title="문서 수정하기"
                >
                  <span>
                    <img className="h-[20px] w-[20px]" src={UpdateIcon} />
                  </span>
                </button>
                <button
                  className="hover:text-gray-700"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  title="문서 삭제하기"
                >
                  <span>
                    <img className="h-[20px] w-[20px]" src={DeletIcon} />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {showDeleteModal &&
        createPortal(
          <ListDeleteModal
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />,
          document.body
        )}
    </>
  );
}

export default ItemRow;
