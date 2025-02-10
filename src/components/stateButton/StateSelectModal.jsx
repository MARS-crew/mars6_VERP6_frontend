import React from "react";
import StateButton from "./StateButton";

const config = ["REQUESTED", "IN_PROGRESS", "COMPLETED", "CANCELED"];
function StateSelectModal({ onStateChange }) {

  const handleClick = (item) => {
    onStateChange(item);
  };

  return (
    <div className="z-50 w-[102px] h-[155px] shadow-lg bg-white rounded-lg px-[15px] py-[15px] flex flex-col gap-2 place-content-between absolute mt-2">
      {config.map((item) => (
        <StateButton key={item} state={item} onClick={() => handleClick(item)} />
      ))}
      
    </div>
  );
}

export default StateSelectModal;
