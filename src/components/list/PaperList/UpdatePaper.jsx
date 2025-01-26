import React, { useState } from "react";
import DocumentListInput from "../../Input/DocumentListInput";
import PencilIcon from "../../../assets/images/icon-pencil.png"
import DeletIcon from "../../../assets/images/icon-delete.png"

const DocumentEmList = () => {
  const [documentType, setDocumentType] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    if (documentType.trim()) {
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div
    className={`mb-6 pb-6 border-b border-gray-200 last:mb-0`}
    >
      {isEditing ? (
        <div className="h-full">
          <DocumentListInput
            value = {documentType}
            onChange = {handleInputChange}
            onBlur = {handleSave}
            onKeyDown = {handleKeyDown}
          />
        </div>
      ) : (
        <div className="h-full">
          <div className="text-[28px] pl-[20px] pt-[14px]">{documentType}</div>
            <div className="text-[16px] text-gray-500 pl-[20px]">현재 등록되어 있는 문서가 없습니다.
                {/* 수정 아이콘 */}
                <button className="hover:text-gray-700">
                <span> <img className="h-[16px]" src={PencilIcon} /></span>
                </button>
                {/* 삭제 아이콘 */}
                <button className="hover:text-gray-700">
                <span> <img className="h-[16px]" src={DeletIcon} /></span>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEmList;
