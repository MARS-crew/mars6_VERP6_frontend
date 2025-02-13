import React from "react";

function StateButton({ state, onClick, count }) {
  const config = {
    PENDING: { text: "대기", bgColor: "bg-[#B3B3B3]" },
    IN_PROGRESS: { text: "진행중", bgColor: "bg-[#75A8E7]" },
    COMPLETED: { text: "완료", bgColor: "bg-[#14AE5C]" },
  };
  const { text, bgColor } = config[state] || {
    text: "알 수 없음",
    bgColor: "bg-gray-300",
  };

  return (
    <div onClick={onClick} className={`z-50 flex items-center justify-center ${bgColor} h-6 px-2 rounded-[5px]`}>
      <span className="text-[15px] text-white">{text}</span>
      {count !== undefined && (
        <span className="text-[15px] text-white ml-1">| {count}건</span>
      )}
    </div>
  );
}

/*
PENDING - 대기
IN_PROGRESS - 진행
COMPLETED - 완료
*/

export default StateButton;
