import React, { useState } from "react";
import moreIcon from "../../assets/images/more-icon.png";
import DocModifyModal from "../Modal/DocModifyModal";
import DocumentTypeInput from "../Input/DocumentTypeInput";
import DocumentListInput from "../Input/DocumentListInput";
import DocTypeValidator from "../Validator/DocTypeValidator";
import ItemRow from "./DocumentRow/ItemRow";
import useDocument from "../../hooks/useDocument";

const INITIAL_ITEMS = (inputValue) => ({
  name: inputValue,
  fileLink: `${inputValue}.ppt`,
  progressPercent: 33,
  waitPercent: 33,
  updated: "1일전",
  state: true,
  docId: null
});

function DocumentList({ id, onRemove }) {
  const { document, isLoading, startEditing } = useDocument(id);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [items, setItems] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    value: "",
    showValidator: false,
  });
  const [showInput, setShowInput] = useState(false);

  const handleMoreClick = () => setShowModifyModal((prev) => !prev);
  const handleCloseModal = () => setShowModifyModal(false);
  const handleDelete = () => {
    onRemove(id);
    handleCloseModal();
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

  const handleDocumentCreated = (createdDoc) => {
    if (!currentInput.value.trim()) return;

    console.log('[생성된 문서 정보]', createdDoc);

    if (createdDoc.result && createdDoc.result.docId) {
      const newItem = {
        ...INITIAL_ITEMS(currentInput.value),
        docId: createdDoc.result.docId,
        name: currentInput.value
      };

      console.log('[새로 생성된 아이템]', newItem);
      setItems(prev => [...prev, newItem]);
      setCurrentInput({ value: '', showValidator: false });
      setShowInput(false);
    } else {
      console.error('문서 생성 응답에 docId가 없습니다:', createdDoc);
    }
  };

  const handleDocumentDelete = (docId) => {
    if (!docId) {
      console.error('삭제할 문서의 ID가 없습니다.');
      return;
    }

    console.log('[문서 삭제 처리]', { docId });
    
    setItems(prev => {
      const filtered = prev.filter(item => item.docId !== docId);
      console.log('[삭제 후 남은 아이템]', filtered);
      return filtered;
    });
  };

  const handlelistKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-[1194px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] relative min-h-[230px] pb-[60px]">
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
      <div>
        <DocumentTypeInput documentId={id} />
        <div className="mt-4">
          {document?.title && !document?.isEditing && (
            <div className="pl-[20px] space-y-4">
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <ItemRow
                    key={idx}
                    item={item}
                    isLast={idx === items.length - 1}
                    docTypeId={document.id}
                    onRemove={handleDocumentDelete}
                  />
                ))}
              </div>

              {showInput && (
                <div className="mb-4">
                  <DocumentListInput
                    value={currentInput.value}
                    onChange={handleListInputChange}
                    onKeyDown={handlelistKeyDown}
                    docTypeId={document.id}
                    onDocumentCreated={handleDocumentCreated}
                  />
                  {currentInput.showValidator && (
                    <div className="pl-[20px]">
                      <DocTypeValidator />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-[18px] left-0 w-full flex justify-center">
        <span
          className="text-[30px] text-[#8E98A8] leading-[30px] cursor-pointer"
          onClick={handleAddList}
        >
          +
        </span>
      </div>
    </div>
  );
}

export default DocumentList;
