import { useCallback, useState } from 'react';
import DocDeleteModal from './DocDeleteModal';

function ModifyButton({ onClick, children }) {
  return (
    <button
      onClick = {onClick}
      className = "w-[72px] h-[68px] text-[20px] font-medium text-black"
    >
      {children}
    </button>
  );
}

function DocModifyModal({ onClose, onDelete, onModify }) {
  const [selectedButton, setSelectedButton] = useState('수정');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && !showDeleteModal) {
      onClose();
    }
  }, [onClose, showDeleteModal]);

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    if (buttonType === '삭제') {
      setShowDeleteModal(true);
    } else if (buttonType === '수정') {
      onModify();
    }
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteModal(false);
    onClose();
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      {!showDeleteModal ? (
        <div 
          onClick = {handleOverlayClick}
          className = "bg-white w-[144px] h-[68px] rounded-[5px] shadow-[0_0_2px_2px_rgba(0,0,0,0.5)]"
        >
          <div className = "flex items-center">
            <ModifyButton 
              selected = {selectedButton === '수정'}
              onClick = {() => handleButtonClick('수정')}
            >
              수정
            </ModifyButton>
            <div className = "h-[50px] w-[1px] bg-[#8E98A8]"></div>
            <ModifyButton 
              selected = {selectedButton === '삭제'}
              onClick = {() => handleButtonClick('삭제')}
            >
              삭제
            </ModifyButton>
          </div>
        </div>
      ) : (
        <DocDeleteModal
          onDelete = {handleDelete}
          onCancel = {handleCancel}
        />
      )}
    </>
  );
}

export default DocModifyModal;

