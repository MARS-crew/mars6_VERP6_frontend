import React from "react";
import StateButton from "./StateButton";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

const defaultConfig = ["PENDING", "IN_PROGRESS", "COMPLETED"];
const teamLeaderConfig = ["PENDING", "CHECKED", "REJECTED", "APPROVED", "IN_PROGRESS", "COMPLETED"];

function StateSelectModal({ onStateChange }) {
  const auth = useRecoilValue(authState);
  const isTeamLeader = auth.user?.role === "TEAM_LEADER";
  const config = isTeamLeader ? teamLeaderConfig : defaultConfig;

  const handleClick = (item) => {
    onStateChange(item);
  };

  return (
    <div className={`z-50 ${isTeamLeader ? 'w-[102px] h-[250px]' : 'w-[102px] h-[155px]'} shadow-lg bg-white rounded-lg px-[15px] py-[15px] flex flex-col gap-2 place-content-between absolute mt-2`}>
      {config.map((item) => (
        <StateButton key={item} state={item} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
}

export default StateSelectModal;
