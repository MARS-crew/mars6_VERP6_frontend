import React, { useState } from 'react';
import moreIcon from '../../assets/images/more-icon.png';
import DocModifyModal from '../Modal/DocModifyModal';

const DocumentList = ({ id, onRemove }) => {
  const [showModifyModal, setShowModifyModal] = useState(false);

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

  return (
    <div className = "w-[1194px] h-[189px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] p-6 relative">
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList; 