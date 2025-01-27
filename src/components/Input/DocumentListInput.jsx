import React from 'react';

const DocumentListInput = ({ value, onChange, onBlur, onKeyDown }) => {
  return (
    <div className = "w-[333px] relative pl-[20px] pt-[19px]">
      <input
        type = "text"
        value = {value}
        onChange = {onChange}
        onBlur = {onBlur}
        onKeyDown = {onKeyDown}
        placeholder = "*서류명을 1~20자 사이로 입력해주세요."
        className = "w-[333px] h-[32px] text-[17px] focus:outline-none placeholder-[#B2B2B2]"
        autoFocus
      />
      <div className = "absolute left-[13px] right-0 bottom-0 border-b border-[#D9D9D9]" />
    </div>
  );
};

export default DocumentListInput; 