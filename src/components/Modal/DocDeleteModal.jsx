import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DeleteButton from '../Button/DeleteButton';
import warningIcon from '../../assets/warning-icon.svg';

function DocDeleteModal({ onDelete, onCancel }) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }, [onCancel]);

  const modalContent = (
    <div className ="fixed inset-0 z-[9999] isolate">
      <div className="absolute inset-0 bg-black/50" onClick={handleOverlayClick} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white w-[500px] h-[250px] rounded-[10px] flex flex-col items-center pt-[19px] shadow-[0_0_2px_2px_rgba(0,0,0,0.5)]">
          <img 
            src={warningIcon} 
            alt="warning" 
            className="w-[38px] h-[33px] mb-4"
          />
          <div className="mb-2 space-y-2">
            <div className="space-y-2">
              <p id="modal-title" className="text-[20px] font-normal text-center leading-[25px]">
                서류를 삭제하면 관련 리스트도
              </p>
              <p className="text-[20px] font-normal text-center leading-[25px]">
                모두 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <p className="text-[20px] font-bold text-center leading-[25px]">
              정말 삭제하시겠습니까?
            </p>
          </div>

          <div className = "w-full px-[71px] pb-[29px] mt-auto flex justify-between">
            <DeleteButton onClick = {onDelete} variant = "delete">
              Delete
            </DeleteButton>
            <DeleteButton onClick = {onCancel} variant = "cancel">
              Cancel
            </DeleteButton>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default DocDeleteModal; 