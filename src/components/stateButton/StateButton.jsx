import React from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

function StateButton({ state, onClick, count }) {
  const auth = useRecoilValue(authState);
  const isTeamLeader = auth.user?.role === "TEAM_LEADER";

  const config = {
    PENDING: { text: "대기", bgColor: "bg-[#B3B3B3]" },
    CHECKED: { text: "검토", bgColor: "bg-[#5A5A5A]" },
    REJECTED: { text: "거절", bgColor: "bg-[#EC221F]" },
    APPROVED: { text: "승인", bgColor: "bg-[#14AE5C]" },
    IN_PROGRESS: { text: "진행중", bgColor: "bg-[#75A8E7]" },
    COMPLETED: { text: "완료", bgColor: "bg-[#14AE5C]" },
  };

  const { text, bgColor } = config[state] || {
    text: "알 수 없음",
    bgColor: "bg-gray-300",
  };

  if (!isTeamLeader && ["CHECKED", "REJECTED", "APPROVED"].includes(state)) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div
        onClick={onClick}
        className={`z-50 w-[72px] h-[24px] flex items-center justify-center ${bgColor} rounded-[5px] cursor-pointer`}
      >
        <span className="text-[12px] font-medium text-white">{text}</span>
      </div>
      {count !== undefined && (
        <span className="text-[17px] text-[#5A5A5A] gap-1"> ┃{count}건</span>
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
