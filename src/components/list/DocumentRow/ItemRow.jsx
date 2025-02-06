// src/components/ItemRow.js
import React, { useState } from "react";
import MoreIcon from "../../../assets/images/more-icon.png"
import PencilIcon from "../../../assets/images/icon-pencil.png"
import { useNavigate } from "react-router-dom";
import AlertIcon from "../../../assets/svg/AlertIcon.svg"
import UpdateIcon from "../../../assets/svg/UpdateIcon.svg"
import DeletIcon from "../../../assets/svg/DeletIcon.svg"
import BellIcon from "../../../assets/images/bell-icon.png"
import useDocumentUpdate from "../../../hooks/useDocumentUpdate";
import DocumentListInput from "../../Input/DocumentListInput";

function ItemRow({ item, isLast, docTypeId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);
  const { updateDocument, isLoading } = useDocumentUpdate();
  const isempty = item.state;
  const waittotal = item.waitPercent + item.progressPercent;

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = async () => {
    if (editValue.trim() && editValue !== item.name) {
      try {
        console.log('[문서 수정 시도]', {
          documentId: item.docId,
          currentTitle: item.name,
          newTitle: editValue,
          docTypeId: docTypeId
        });

        const result = await updateDocument(
          item.docId,  // 문서 ID
          editValue,   // 새 제목
          docTypeId    // 문서 타입 ID
        );

        if (result.isSuccess) {
          console.log('[문서 수정 성공]', result);
          item.name = editValue;
          setIsEditing(false);
        } else {
          console.error('[문서 수정 실패]', result);
          setEditValue(item.name);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('[문서 수정 에러]', error);
        setEditValue(item.name);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
      setEditValue(item.name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const shortenedFileLink =
    item.fileLink.length > 10
      ? `${item.fileLink.slice(0, 10)}...`
      : item.fileLink;

  return (
    <div
      className={`mb-6 mt-[19px] pb-6 ${!isLast && "border-b border-[#B4B4B4]"} last:mb-0 mr-[20px]`}
    >
      <div className="flex items-center justify-between mb-2">
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
                disabled={isLoading}
              />
              <div className="border-b border-[#D9D9D9]" />
            </div>
          ) : (
            <>
              {item.name}
              {isempty && <img className="ml-[10px] mt-[5px] h-[16px]" src={BellIcon} />}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <div className="w-[533px] bg-[#9CA2B3] rounded-full h-[36px] mb-2 flex relative mt-[9px]">
            <div
              className="bg-[#14AE5C] h-[36px] rounded-full absolute"
              style={{ 
                width: `${item.progressPercent}%` 
              }}
            />
            <div 
              className="bg-[#5A5A5A] h-[36px] rounded-full" 
              style={{ 
                width: `${waittotal}%` 
              }}
            />
          </div>
        </div>

        <div 
          className="flex items-center text-black text-[20px] font-medium truncate"
          style={{ maxWidth: "200px" }}
          title={item.fileLink}
        >
          <span>{item.fileLink}</span>
        </div>
        <div className="flex items-center gap-10 mr-[70px] text-[20px]">
          <span>{item.updated}</span>
          <button 
            className="hover:text-gray-700"
            onClick={handleUpdateClick}
            disabled={isLoading}
          >
            <span> 
              <img className="h-[20px] w-[20px]" src={UpdateIcon} />
            </span>
          </button>
          <button className="hover:text-gray-700">
            <span>
              <img className="h-[20px] w-[20px]" src={DeletIcon} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
