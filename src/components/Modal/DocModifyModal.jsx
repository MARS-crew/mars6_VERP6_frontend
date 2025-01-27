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

<<<<<<< HEAD
const DocModifyModal = ({ onClose }) => {
=======
function DocModifyModal({ onClose, onDelete, onModify }) {
>>>>>>> 566ae9ddf46aa62c6fde61e4569573cfb504d5e7
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
    }
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    setShowDeleteModal(false);
    onClose();
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setShowDeleteModal(false);
  };

  return (
    <div 
      className = "fixed inset-0 flex items-center justify-center z-50"
      onClick = {handleOverlayClick}
    >
      {!showDeleteModal ? (
        <div 
          className = "bg-white w-[144px] h-[68px] rounded-[5px] flex items-center justify-center shadow-[0_0_2px_2px_rgba(0,0,0,0.5)]"
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
    </div>
  );
}

export default DocModifyModal;

