import React from "react";
import StateButton from "./StateButton";

const config = ["PENDING", "IN_PROGRESS", "COMPLETED"];
function StateSelectModal({ onStateChange }) {

  const handleClick = (item) => {
    onStateChange(item);
  };

  return (
    <div className="z-50 w-[100px] h-[130px] shadow-lg bg-white rounded-lg px-[5px] py-[15px] flex flex-col gap-2 place-content-between absolute mt-1">
      {config.map((item) => (
        <StateButton key={item} state={item} onClick={() => handleClick(item)} />
      ))}
      
    </div>
  );
}

export default StateSelectModal;
