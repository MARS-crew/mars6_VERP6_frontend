import React, { useState, useEffect } from 'react';
import useDocument from '../../hooks/useDocument';
import DocTypeValidator from '../Validator/DocTypeValidator';
import DocValidator from '../Validator/DocValidator';
import { useQueryClient } from '@tanstack/react-query';

function DocumentTypeInput({ documentId, isNew, onCancel }) {
  const { createDocument, updateDocument, resetDocument, isLoading, error, document, setDocument } = useDocument(documentId);
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (document.isEditing) {
      setTitle(document.title || '');
    }
  }, [document.isEditing]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const validateInput = (value) => {
    const validPattern = /^[가-힣a-zA-Z0-9\s]*$/;
    const isValidLength = value.length > 0 && value.length <= 8;
    const isValidChar = validPattern.test(value);
    
    setDocument(prev => ({
      ...prev,
      title: value,
      showLengthValidator: !isValidLength,
      showCharValidator: !isValidChar
    }));

    return isValidLength && isValidChar;
  };

  const handleCancel = () => {
    resetDocument();
    if (onCancel) {
      onCancel();
    }
  };

  const handleBlur = async () => {
    if (!title.trim()) {
      if (isNew) {
        queryClient.setQueryData(['docTypes'], (old) => ({
          ...old,
          result: old?.result?.filter(doc => doc.id) || []
        }));
        handleCancel();
      }
      return;
    }

    const isValid = validateInput(title);
    if (isValid) {
      if (document.id) {
        await updateDocument(title);
        if (onCancel) {
          onCancel();
        }
      } else {
        await createDocument(title);
        if (onCancel) {
          onCancel();
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateInput(title);
      e.target.blur();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="w-[333px] relative pl-[20px] pt-[14px]">
      {document.isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="서류의 종류를 입력해주세요."
            className="w-[333px] h-[45px] text-[24px] focus:outline-none placeholder-[#B2B2B2]"
            autoFocus
            disabled={isLoading}
          />
          <div className="absolute left-[13px] right-0 bottom-0 border-b border-[#D9D9D9]" />
          <div className="absolute left-[20px] top-[65px] space-y-1">
            {document.showCharValidator && <DocTypeValidator />}
            {document.showLengthValidator && <DocValidator />}
          </div>
          {error && (
            <div className="text-[#FF595C] text-sm mt-2">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <div className="text-[28px]">{document.title}</div>
      )}
    </div>
  );
}

export default DocumentTypeInput; 