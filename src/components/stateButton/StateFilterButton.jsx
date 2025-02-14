import React from "react";

function StateFilterButton({ state, onClick }) {
  const config = {
    ALL : {text:"전체",bgColor:"bg-[#a032a8]"},
    IN_PROGRESS: { text: "진행중", bgColor: "bg-[#75A8E7]" },
    PENDING: { text: "대기", bgColor: "bg-[#B3B3B3]" },
    COMPLETED: { text: "완료", bgColor: "bg-[#14AE5C]" },
  };
  const { text, bgColor } = config[state] || {
    text: "알 수 없음",
    bgColor: "bg-gray-300",
  };

  return (
    <div onClick={onClick} className={`w-[72px] h-6 rounded-[5px] ${bgColor}`}>
      <p className="text-[12px] font-medium text-white text-center">{text}</p>
    </div>
  );
}

export default StateFilterButton;
