import { useCallback } from 'react';
import DeleteButton from '../Button/DeleteButton';
import warningIcon from '../../assets/warning-icon.svg';

function ListDeleteModal({ onDelete, onCancel }) {
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }, [onCancel]);


  return (
    <>
      <div className = "fixed inset-0 bg-black/50 z-[100]" onClick = {handleOverlayClick} />
      <div className = "fixed inset-0 flex items-center justify-center z-[101]" onClick = {handleOverlayClick}>
        <div className = "bg-white w-[500px] h-[250px] rounded-[10px] flex flex-col items-center pt-[19px] shadow-[0_0_2px_2px_rgba(0,0,0,0.5)]">
          <img 
            src = {warningIcon} 
            alt = "warning" 
            className = "w-[38px] h-[33px] mb-4"
          />
          <div className = "mb-2 space-y-2">
            <div className = "space-y-2">
              <p id = "modal-title" className = "text-[20px] font-normal text-center leading-[25px]">
                리스트를 삭제하면 업데이트 히스토리도
              </p>
              <p className = "text-[20px] font-normal text-center leading-[25px]">
                모두 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <p className = "text-[20px] font-bold text-center leading-[25px]">
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
    </>
  );
}

export default ListDeleteModal; 