import { useCallback } from 'react';
import DeleteButton from '../Button/DeleteButton';

const DocDeleteModal = ({ onDelete, onCancel }) => {
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }, [onCancel]);

  return (
    <div 
      className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick = {handleOverlayClick}
    >
      <div 
        className = "bg-white w-[500px] h-[250px] rounded-[10px] flex flex-col items-center justify-center"
        role = "dialog"
        aria-modal = "true"
        aria-labelledby = "modal-title"
      >
        <div className = "mb-4 space-y-2">
          <div className = "space-y-2">
            <p id = "modal-title" className = "text-[20px] text-center">
              서류를 삭제하면 관련 리스트도
            </p>
            <p className = "text-[20px] text-center">
              모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>
          <p className = "text-[20px] font-bold text-center">
            정말 삭제하시겠습니까?
          </p>
        </div>

        <div className = "flex gap-4 mt-4">
          <DeleteButton onClick = {onDelete} variant = "delete">
            Delete
          </DeleteButton>
          <DeleteButton onClick = {onCancel} variant = "cancel">
            Cancel
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default DocDeleteModal; 