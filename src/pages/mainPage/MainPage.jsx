import React, { useState } from "react";
import DocDeleteModal from '../../components/Modal/DocDeleteModal';

function MainPage() {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    console.log('Delete clicked');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    setShowModal(false);
  };

  return (
    <div className = "h-screen flex items-center justify-center">
      <button
        onClick = {() => setShowModal(true)}
        className = "px-4 py-2 bg-red-500 text-white rounded"
      >
        삭제 모달 열기
      </button>

      {showModal && (
        <DocDeleteModal 
          onDelete = {handleDelete}
          onCancel = {handleCancel}
        />
      )}
    </div>
  );
}

export default MainPage;
