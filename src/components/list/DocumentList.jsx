import React, { useState } from 'react';
import moreIcon from '../../assets/images/more-icon.png';
import DocModifyModal from '../Modal/DocModifyModal';
import DocumentTypeInput from '../Input/DocumentTypeInput';

const DocumentList = ({ id, onRemove }) => {
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [isEditing, setIsEditing] = useState(true);

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
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div className = "w-[1194px] h-[189px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] relative">
      {isEditing ? (
        <DocumentTypeInput
          value = {documentType}
          onChange = {handleChange}
          onBlur = {handleSave}
          onKeyDown = {handleKeyDown}
        />
      ) : (
        <div className = "text-[28px] pl-[20px] pt-[14px]">{documentType}</div>
      )}
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
    </div>
  );
};

export default DocumentList; 