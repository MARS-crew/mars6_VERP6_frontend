import { useCallback, useState } from 'react';
import DocDeleteModal from './DocDeleteModal';
import useDocTypeDelete from '../../hooks/useDocTypeDelete';

function ModifyButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-[72px] h-[68px] text-[20px] font-medium text-black"
    >
      {children}
    </button>
  );
}

function DocModifyModal({ onClose, onDelete, onModify, docTypeId }) {
  const [selectedButton, setSelectedButton] = useState('수정');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteDocType, isLoading } = useDocTypeDelete();

  const showToastMessage = () => {
    const event = new CustomEvent('showToast', {
      detail: { message: '문서 타입이 삭제되었습니다.' }
    });
    window.dispatchEvent(event);

    setTimeout(() => {
      onDelete();
      setShowDeleteModal(false);
      onClose();
    }, 3000);
  };

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
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      if (!docTypeId) {
        console.error('삭제할 문서 타입의 ID가 없습니다.');
        alert('삭제할 문서 타입이 존재하지 않습니다.');
        return;
      }

      console.log('[문서 타입 삭제 시도]', {
        docTypeId: docTypeId
      });

      const result = await deleteDocType(docTypeId);
      
      if (result.isSuccess) {
        showToastMessage();
      }
    } catch (error) {
      console.error('[문서 타입 삭제 에러]', error);
      
      if (error.response?.status === 404) {
        alert('해당 문서 타입을 찾을 수 없거나 이미 삭제되었습니다.');
        onDelete();
      } else {
        alert('문서 타입 삭제 중 오류가 발생했습니다.');
      }
      
      setShowDeleteModal(false);
      onClose();
    }
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
              disabled = {isLoading}
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

