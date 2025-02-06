import React, { useState, useEffect } from 'react';
import useDocument from '../../hooks/useDocument';
import DocValidator from '../Validator/DocValidator';

function DocumentTypeInput({ documentId }) {
  const { createDocument, updateDocument, resetDocument, isLoading, error, document } = useDocument(documentId);
  const [title, setTitle] = useState('');

  useEffect(() => {
    resetDocument();
    setTitle('');
  }, [documentId]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (document.id) {
      updateDocument(title);
    } else {
      createDocument(title);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div className = "w-[333px] relative pl-[20px] pt-[14px]">
      {document.isEditing ? (
        <>
          <input
            type = "text"
            value = {title}
            onChange = {handleChange}
            onBlur = {handleBlur}
            onKeyDown = {handleKeyDown}
            placeholder = "서류의 종류를 입력해주세요."
            className = "w-[333px] h-[45px] text-[24px] focus:outline-none placeholder-[#B2B2B2]"
            autoFocus
            disabled = {isLoading}
          />
          <div className = "absolute left-[13px] right-0 bottom-0 border-b border-[#D9D9D9]" />
          {document.showValidator && (
            <div className = "absolute left-[20px] top-[65px]">
              <DocValidator />
            </div>
          )}
          {error && (
            <div className = "text-[#FF595C] text-sm mt-2">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <div className = "text-[28px]">{document.title}</div>
      )}
    </div>
  );
}

export default DocumentTypeInput; 