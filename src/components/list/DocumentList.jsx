import React from 'react';
import moreIcon from '../../assets/images/more-icon.png';

const DocumentList = () => {
  return (
    <div className = "w-[1194px] h-[189px] bg-white rounded-[8px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] p-6 relative">
      <img 
        src = {moreIcon} 
        alt = "more" 
        className = "absolute top-[32px] right-[6px] cursor-pointer w-[32px] h-[32px]"
      />
    </div>
  );
};

export default DocumentList; 