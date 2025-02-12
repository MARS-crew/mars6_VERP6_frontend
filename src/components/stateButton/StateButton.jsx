import React from "react";

function StateButton({ state, onClick }) {
  const config = {
    REQUESTED: { text: "대기", bgColor: "bg-[#B3B3B3]" },
    IN_PROGRESS: { text: "진행중", bgColor: "bg-[#75A8E7]" },
    COMPLETED: { text: "승인", bgColor: "bg-[#14AE5C]" },
  };
  const { text, bgColor } = config[state] || {
    text: "알 수 없음",
    bgColor: "bg-gray-300",
  };

  return (
    <div onClick={onClick} className={`z-50 w-[72px] h-6 rounded-[5px] ${bgColor}`}>
      <p className="text-[15px] font-bold text-white text-center">{text}</p>
    </div>
  );
}

export default StateButton;
