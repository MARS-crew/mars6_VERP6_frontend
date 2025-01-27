import React, { useState } from 'react';
import moreIcon from '../../assets/images/more-icon.png';
import DocModifyModal from '../Modal/DocModifyModal';
import DocumentTypeInput from '../Input/DocumentTypeInput';
import DocValidator from '../Validator/DocValidator';

function DocumentList({ id, onRemove }) {
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [showValidator, setShowValidator] = useState(false);
  const [addListCount, setAddListCount] = useState(1);

  const handleMoreClick = () => {
    setShowModifyModal(prev => !prev);
  };

  const handleCloseModal = () => {
    setShowModifyModal(false);
  };

  const handleDelete = () => {
    onRemove(id);
    setShowModifyModal(false);
  };

  const handleModify = () => {
    setIsEditing(true);
    setShowModifyModal(false);
  };

  const handleChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleSave = () => {
    if (documentType.trim()) {
      if (documentType.length > 8) {
        setShowValidator(true);
      } else {
        setIsEditing(false);
        setShowValidator(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleAddList = () => {
    setAddListCount(prev => prev + 1);
  };

  return (
    <div style={{ height: `${189 + (addListCount - 1) * 188}px`, transition: 'height 0.3s ease-in-out' }} className = "w-[1194px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] relative">
      <div className = "absolute top-[32px] right-[6px]">
        <img 
          src = {moreIcon} 
          alt = "more" 
          className = "cursor-pointer w-[32px] h-[32px]"
          onClick = {handleMoreClick}
        />
        {showModifyModal && (
          <div className = "absolute top-[40px] right-[20px] z-[100]">
            <DocModifyModal 
              onClose = {handleCloseModal}
              onDelete = {handleDelete}
              onModify = {handleModify}
            />
          </div>
        )}
      </div>
      <div className = "h-full">
        {isEditing ? (
          <div className = "h-full">
            <DocumentTypeInput
              value = {documentType}
              onChange = {handleChange}
              onBlur = {handleSave}
              onKeyDown = {handleKeyDown}
            />
            {showValidator && (
              <div className = "pl-[33px]">
                <DocValidator />
              </div>
            )}
          </div>
        ) : (
          <div className = "h-full">
            <div className = "text-[28px] pl-[20px] pt-[14px]">{documentType}</div>
            <div className = "absolute bottom-[18px] w-full flex justify-center">
              <span 
                className = "text-[30px] text-[#8E98A8] leading-[30px] cursor-pointer"
                onClick = {handleAddList}
              >
                +
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentList;