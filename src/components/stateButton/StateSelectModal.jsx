import React from "react";
import StateButton from "./StateButton";

const config = ["REQUESTED", "IN_PROGRESS", "COMPLETED", "CANCELED"];
function StateSelectModal() {
  return (
    <div className="z-10 w-[102px] h-[155px] shadow-lg bg-white rounded-lg px-[15px] py-[15px] flex flex-col gap-2 place-content-between absolute mt-2">
      {config.map((item) => (
        <StateButton key={item} state={item} />
      ))}
    </div>
  );
}

export default StateSelectModal;
