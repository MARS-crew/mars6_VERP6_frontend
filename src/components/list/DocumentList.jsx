import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";
import moreIcon from "../../assets/images/more-icon.png";
import DocModifyModal from "../Modal/DocModifyModal";
import DocumentTypeInput from "../Input/DocumentTypeInput";
import DocumentListInput from "../Input/DocumentListInput";
import DocTypeValidator from "../Validator/DocTypeValidator";
import ItemRow from "./DocumentRow/ItemRow";
import useDocument from "../../hooks/useDocument";
import useDocTypeDocuments from "../../hooks/useDocTypeDocuments";
import useDocTypeDelete from "../../hooks/useDocTypeDelete";
import { useQueryClient } from "@tanstack/react-query";
import StateButton from "../stateButton/StateButton";
import { useAlert } from "../../hooks/usealertIcon";
import { createPortal } from "react-dom";

// const INITIAL_ITEMS = (inputValue) => ({
//   name: inputValue,
//   fileLink: `${inputValue}.ppt`,
//   progressPercent: 33,
//   waitPercent: 33,
//   updated: "1일전",
//   state: true,
//   docId: null
// });

function DocumentList({ id, initialTitle, isNew }) {
  const auth = useRecoilValue(authState);
  const isTeamLeader = auth.user?.role === "TEAM_LEADER";
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [currentInput, setCurrentInput] = useState({
    value: "",
    showValidator: false,
  });
  const [showInput, setShowInput] = useState(false);
  const { readDoc } = useAlert();
  const [statusCounts, setStatusCounts] = useState({
    PENDING: 0,
    CHECKED: 0,
    REJECTED: 0,
    APPROVED: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    document,
    isLoading: isDocLoading,
    startEditing,
    setDocument,
  } = useDocument(id);
  const currentDocTypeId = Number(document?.id || id);
  const {
    documents,
    isLoading: isDocsLoading,
    refetch: refetchDocuments,
  } = useDocTypeDocuments(currentDocTypeId);
  const { deleteDocType } = useDocTypeDelete();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isNew) {
      setDocument((prev) => ({
        ...prev,
        isEditing: true,
      }));
    } else if (initialTitle) {
      setDocument((prev) => ({
        ...prev,
        id: Number(id),
        title: initialTitle,
        isEditing: false,
      }));
    }
  }, [initialTitle, id, setDocument, isNew]);

  useEffect(() => {
    const handleDocTypeDeleted = (event) => {
      if (event.detail.id === Number(id)) {
        // console.log('문서 타입 삭제 감지:', id);
        setIsDeleted(true);
      }
    };

    window.addEventListener("docTypeDeleted", handleDocTypeDeleted);
    return () => {
      window.removeEventListener("docTypeDeleted", handleDocTypeDeleted);
    };
  }, [id]);

  useEffect(() => {
    if (currentDocTypeId) {
      // console.log('[문서 타입 ID 변경 감지]', { currentDocTypeId });
      refetchDocuments();
    }
  }, [currentDocTypeId, refetchDocuments]);

  useEffect(() => {
    if (Array.isArray(documents)) {
      console.log('[문서 목록 업데이트]', documents);
      const counts = documents.reduce((acc, doc) => {
        // 각 문서의 요청 단계별 개수를 합산
        acc.PENDING += doc.pendingRequestStep || 0;
        acc.CHECKED += doc.checkedRequestStep || 0;
        acc.REJECTED += doc.rejectedRequestStep || 0;
        acc.APPROVED += doc.approvedRequestStep || 0;
        acc.IN_PROGRESS += doc.inProgressRequestStep || 0;
        acc.COMPLETED += doc.completedRequestStep || 0;
        console.log('[문서 상태 카운트]', doc.title, {
          pending: doc.pendingRequestStep,
          checked: doc.checkedRequestStep,
          rejected: doc.rejectedRequestStep,
          approved: doc.approvedRequestStep,
          inProgress: doc.inProgressRequestStep,
          completed: doc.completedRequestStep
        });
        return acc;
      }, {
        PENDING: 0,
        CHECKED: 0,
        REJECTED: 0,
        APPROVED: 0,
        IN_PROGRESS: 0,
        COMPLETED: 0,
      });
      console.log('[최종 상태 카운트]', counts);
      setStatusCounts(counts);
    }
  }, [documents]);

  const handleMoreClick = () => setShowModifyModal((prev) => !prev);
  const handleCloseModal = () => setShowModifyModal(false);

  const handleDelete = async () => {
    try {
      const response = await deleteDocType(id);
      if (response.isSuccess) {
        handleCloseModal();
        setIsDeleted(true);
      } else {
        alert(response.message || "문서 타입 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("[문서 타입 삭제 실패]", error);
      alert(
        error.response?.data?.message ||
          "문서 타입 삭제 중 오류가 발생했습니다."
      );
    }
  };

  const handleModify = () => {
    startEditing();
  };

  const handleAddList = () => {
    setShowInput(true);
  };

  const handleListInputChange = (e) => {
    const value = e.target.value;
    setCurrentInput({
      value,
      showValidator: false
    });
  };

  const handleReadDocument = (docId) =>{
    readDoc.mutate(docId);
  }

  const handleDocTypeCreated = () => {
    if (isNew) {
      setIsDeleted(true);
    }
    setDocument(prev => ({
      ...prev,
      isEditing: false
    }));
  };

  const handlelistKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleRemoveDocument = (docId) => {
    queryClient.invalidateQueries(["docTypeDocuments", id]);
  };

  if (isDocLoading || isDocsLoading) {
    return <div>로딩 중...</div>;
  }

  if (isDeleted) {
    return null;
  }

  return (
    <>
      {!isDeleted && (
        <div className="w-[1194px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] relative min-h-[230px] pb-[60px]">
          {!isNew && (
            <div className="absolute top-[32px] right-[6px]">
              <img
                src={moreIcon}
                alt="more"
                className="cursor-pointer w-[32px] h-[32px]"
                onClick={handleMoreClick}
              />
              {showModifyModal && (
                <div className="absolute top-[40px] right-[20px] z-[100]">
                  <DocModifyModal
                    onClose={handleCloseModal}
                    onDelete={handleDelete}
                    onModify={handleModify}
                    docTypeId={document.id}
                  />
                </div>
              )}
            </div>
          )}
          <div>
            <DocumentTypeInput 
              documentId={id} 
              isNew={isNew} 
              onCancel={() => {
                if (isNew) {
                  setIsDeleted(true);
                }
                setDocument(prev => ({
                  ...prev,
                  isEditing: false
                }));
              }}
              onCreated={handleDocTypeCreated}
            />
            {document?.title && !document?.isEditing && (
              <>
                <div className="mt-4">
                  <div className="pl-[20px] space-y-4">
                    {Array.isArray(documents) && documents.map((doc, idx) => (
                      <ItemRow
                        key={doc.docId}
                        item={{
                          docId: doc.docId,
                          name: doc.title,
                          fileLink: `${doc.title}.ppt`,
                          completedRequestStep: doc.completedRequestStep || 0,
                          inProgressRequestStep: doc.inProgressRequestStep || 0,
                          pendingRequestStep: doc.pendingRequestStep || 0,
                          checkedRequestStep: doc.checkedRequestStep || 0,
                          rejectedRequestStep: doc.rejectedRequestStep || 0,
                          approvedRequestStep: doc.approvedRequestStep || 0,
                          canceledRequestStep: doc.canceledRequestStep || 0,
                          totalRequestStep: doc.totalRequestStep|| 0,
                          updated: doc.timeAgo || "방금 전",
                          state: true,
                        }}
                        isLast={idx === documents.length - 1}
                        docTypeId={id}
                        onClick={() => handleReadDocument(doc.docId)}
                        onRemove={handleRemoveDocument}
                      />
                    ))}
                  </div>
                  {showInput && (
                    <div className="pl-[20px] mb-4">
                      <DocumentListInput
                        value={currentInput.value}
                        onChange={handleListInputChange}
                        onKeyDown={handlelistKeyDown}
                        docTypeId={currentDocTypeId}
                        onDocumentCreated={handleDocTypeCreated}
                        onCancel={() => setShowInput(false)}
                      />
                      {currentInput.showValidator && (
                        <div className="mt-2">
                          <DocTypeValidator />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {document?.title && !document?.isEditing && (
            <div className="absolute bottom-[18px] left-0 w-full flex justify-center">
              <span
                className="text-[30px] text-[#8E98A8] leading-[30px] cursor-pointer"
                onClick={handleAddList}
              >
                +
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DocumentList;
