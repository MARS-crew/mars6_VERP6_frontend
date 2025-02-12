import React, { useState, useEffect } from "react";
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
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [currentInput, setCurrentInput] = useState({
    value: "",
    showValidator: false,
  });
  const [showInput, setShowInput] = useState(false);

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
      showValidator: value.length > 20,
    });
  };

  const handleDocumentCreated = async (createdDoc) => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["docTypeDocuments", currentDocTypeId],
        exact: true,
      });

      const result = await refetchDocuments();

      setCurrentInput({ value: "", showValidator: false });
      setShowInput(false);
    } catch (error) {
      console.error("[문서 목록 갱신 실패]", {
        error,
        currentDocTypeId,
        documentId: document?.id,
      });
      alert("문서가 생성되었지만 목록을 갱신하는데 실패했습니다.");
    }
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
        <DocumentTypeInput documentId={id} isNew={isNew} />
        {document?.title && !document?.isEditing && (
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
                    canceledRequestStep: doc.canceledRequestStep || 0,
                    totalRequestStep: doc.totalRequestStep|| 0,
                    updated: doc.timeAgo || "방금 전",
                    state: true,
                  }}
                  isLast={idx === documents.length - 1}
                  docTypeId={id}
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
                  onDocumentCreated={handleDocumentCreated}
                />
                {currentInput.showValidator && (
                  <div className="mt-2">
                    <DocTypeValidator />
                  </div>
                )}
              </div>
            )}
          </div>
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
  );
}

export default DocumentList;
