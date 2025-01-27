import React from "react";
import StateButton from "./StateButton";

const config = ["wait", "examine", "refusal", "approval"];

function StateSelectModal() {
  return (
    <div className="w-[102px] h-[155px] shadow-lg bg-white rounded-lg px-[15px] py-[15px] flex flex-col gap-2 place-content-between">
      {config.map((item) => (
        <StateButton key={item} state={item} />
      ))}
    </div>
  );
}

export default StateSelectModal;
