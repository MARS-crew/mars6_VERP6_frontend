// src/components/ItemRow.js
import React, { useEffect, useRef } from "react";
import MoreIcon from "../../../assets/images/more-icon.png"
import PencilIcon from "../../../assets/images/icon-pencil.png"
import { useNavigate } from "react-router-dom";
import AlertIcon from "../../../assets/images/icon-alert.png"
import UpdateIcon from "../../../assets/svg/UpdateIcon.svg"
import DeletIcon from "../../../assets/svg/DeletIcon.svg"

function ItemRow({ item, isLast }) {
  const isempty = item.state
  const waittotal = item.waitPercent+item.progressPercent

  const shortenedFileLink =
    item.fileLink.length > 10
      ? `${item.fileLink.slice(0, 10)}...`
      : item.fileLink;

  return (
    <div
      className={`mb-6 mt-[19px] pb-6 ${!isLast && "border-b border-[#B4B4B4]"} last:mb-0 mr-[20px]`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-gray-700 flex text-[17px]">{item.namelist}
          { isempty ? <img className="ml-[10px] mt-[5px] h-[16px]" src={AlertIcon} />:null}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="w-[533px] bg-[#9CA2B3] rounded-full h-[36px] mb-2 flex relative mt-[9px]">
          <div
            className="bg-[#14AE5C] h-[36px] rounded-full absolute"
            style={{ 
              width: `${item.progressPercent}%` 
            }}
            />
            <div className="bg-[#5A5A5A] h-[36px] rounded-full" 
             style={{ 
              width: `${waittotal}%` 
            }}
            />
        </div>

        <div 
          className="flex items-center text-black text-[20px] font-medium truncate"
          style={{ maxWidth: "200px" }}
          title={item.fileLink}
        >
          <span>{item.fileLink}</span>
        </div>
        <div className="flex items-center gap-10 mr-[70px] text-[20px]">
          <span>{item.updated}</span>
          <button className="hover:text-gray-700">
          <span> 
            <img className="h-[20px] w-[20px]" src={UpdateIcon}
          /></span>
          </button>
          <button className="hover:text-gray-700">
          <span> <img className="h-[20px] w-[20px]" src={DeletIcon} /></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
