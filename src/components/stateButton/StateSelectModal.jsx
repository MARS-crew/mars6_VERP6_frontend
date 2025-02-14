import React from "react";
import StateButton from "./StateButton";

const config = ["PENDING", "IN_PROGRESS", "COMPLETED"];

function StateSelectModal({ onStateChange }) {
  const handleClick = (item) => {
    onStateChange(item);
  };

  return (
    <div className="z-50 w-[102px] h-[120px] shadow-lg bg-white rounded-lg px-[15px] py-[15px] flex flex-col gap-2 place-content-between absolute mt-2">
      {config.map((item) => (
        <StateButton key={item} state={item} onClick={() => handleClick(item)} showAll={true} />
      ))}
    </div>
  );
}

export default StateSelectModal;
