import React from 'react';
import useDocumentList from '../../hooks/useDocumentList';

function DocumentListInput({ value, onChange, onBlur, onKeyDown, docTypeId, onDocumentCreated }) {
  const { createDocument, isLoading, error } = useDocumentList(docTypeId);

  const handleBlur = async (e) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue) {
      try {
        const response = await createDocument(trimmedValue);
        console.log('Document created:', response);
        if (onDocumentCreated) {
          onDocumentCreated(response);
        }
        if (onBlur) onBlur(e);
      } catch (error) {
        console.error('문서 생성 실패:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div className = "w-[333px] relative">
      <input
        type = "text"
        value = {value}
        onChange = {onChange}
        onBlur = {handleBlur}
        onKeyDown = {handleKeyDown}
        placeholder = "서류 종류를 입력해주세요."
        className = "w-[333px] h-[32px] text-[17px] pl-[6px] focus:outline-none placeholder-[#B2B2B2]"
        disabled = {isLoading}
      />
      <div className = "border-b border-[#D9D9D9]" />
      {error && (
        <div className = "text-red-500 text-sm mt-1">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default DocumentListInput; 