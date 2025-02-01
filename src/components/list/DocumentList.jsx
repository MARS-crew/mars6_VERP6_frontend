import React, { useState } from 'react';
import moreIcon from '../../assets/images/more-icon.png';
import DocModifyModal from '../Modal/DocModifyModal';
import DocumentTypeInput from '../Input/DocumentTypeInput';
import DocumentListInput from '../Input/DocumentListInput';
import DocTypeValidator from '../Validator/DocTypeValidator';
import ItemRow from './DocumentRow/ItemRow';
import useDocument from '../../hooks/useDocument';

const INITIAL_ITEMS = [
  {
    name: "Todo list 앱 기획서",
    fileLink: "V0.2 todo 기획서.ppt",
    progressPercent: 50,
    waitPercent: 20,
    updated: "1일전",
    state: true,
  },
  {
    name: "Todo list 웹 기획서",
    fileLink: "영일이삼사오육칠팔구영일이삼사오육칠팔구",
    progressPercent: 70,
    waitPercent: 20,
    updated: "1일전",
    state: false,
  },
];

function DocumentList({ id, onRemove }) {
  const { document, documents, isLoading } = useDocument(id);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [addListCount, setAddListCount] = useState(1);
  const [isListEditing, setListIsEditing] = useState(true);
  const [documentList, setDocumentList] = useState('');
  const [showTypeValidator, setShowTypeValidator] = useState(false);
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleMoreClick = () => setShowModifyModal(prev => !prev);
  const handleCloseModal = () => setShowModifyModal(false);
  const handleDelete = () => {
    onRemove(id);
    handleCloseModal();
  };
  const handleModify = () => handleCloseModal();
  const handleAddList = () => setAddListCount(prev => prev + 1);

  const handleListInputChange = (e) => setDocumentList(e.target.value);

  const handlelistSave = () => {
    const trimmedList = documentList.trim();
    if (!trimmedList) return;

    if (trimmedList.length > 8) {
      setShowTypeValidator(true);
    } else {
      setListIsEditing(false);
      setShowTypeValidator(false);
      setItems(prevItems =>
        prevItems.map(item => ({
          ...item,
          namelist: trimmedList,
        }))
      );
    }
  };

  const handlelistKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const containerHeight = `${110 * addListCount + items.length * 120}px`;

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div 
      style={{ 
        height: containerHeight, 
        transition: 'height 0.3s ease-in-out' 
      }} 
      className="w-[1194px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] relative"
    >
      <div className="absolute top-[32px] right-[6px]">
        <img 
          src={moreIcon} 
          alt="more" 
          className="cursor-pointer w-[32px] h-[32px]"
          onClick={handleMoreClick}
        />
        {showModifyModal && (
          <div className="absolute top-[40px] right-[20px] z-[100]">
            <DocModifyModal 
              onClose={handleCloseModal}
              onDelete={handleDelete}
              onModify={handleModify}
            />
          </div>
        )}
      </div>
      <div className="h-full">
        <DocumentTypeInput documentId={id} />
        <div>
          {isListEditing ? (
            <div className="h-full pl-[20px]">
              {document?.title && !document?.isEditing && (
                <DocumentListInput
                  value={documentList}
                  onChange={handleListInputChange}
                  onBlur={handlelistSave}
                  onKeyDown={handlelistKeyDown}
                  docTypeId={document.id}
                />
              )}
              {showTypeValidator && (
                <div className="pl-[20px]">
                  <DocTypeValidator />
                </div>
              )}
            </div>
          ) : (
            <div className="h-full">
              <div className="pl-[20px]">
                {items.map((item, idx) => (
                  <ItemRow 
                    key={idx} 
                    item={item} 
                    isLast={idx === items.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-[18px] w-full flex justify-center">
          <span 
            className="text-[30px] text-[#8E98A8] leading-[30px] cursor-pointer"
            onClick={handleAddList}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}

export default DocumentList;