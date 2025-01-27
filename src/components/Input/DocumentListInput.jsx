import React from 'react';

function DocumentListInput({ value, onChange, onBlur, onKeyDown }) {
  return (
    <div className = "w-[333px] relative pt-[19px]">
      <input
        type = "text"
        value = {value}
        onChange = {onChange}
        onBlur = {onBlur}
        onKeyDown = {onKeyDown}
        placeholder = "서류 종류를 입력해주세요."
        className = "w-[333px] h-[32px] text-[17px] pl-[6px] focus:outline-none placeholder-[#B2B2B2]"
        autoFocus
      />
      <div className = "border-b border-[#D9D9D9]" />
    </div>
  );
}

export default DocumentListInput; 