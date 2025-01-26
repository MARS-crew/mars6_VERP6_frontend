// src/components/ItemRow.js
import React, { useState } from "react";
import MoreIcon from "../../../assets/images/more-icon.png"
import PencilIcon from "../../../assets/images/icon-pencil.png"
import DeletIcon from "../../../assets/images/icon-delete.png"
import { useNavigate } from "react-router-dom";

function UpItemRow({ item, isLast }) {

    //const navigate = useNavigate();
    //const [title,setTitle] = useState();


  // item = { name, fileLink, progressPercent, updated }
  // isLast = boolean(마지막 요소인지 여부) -> border 처리를 위해 사용
  
  return (
    <div
      className={`mb-6 pb-6 ${!isLast && "border-b border-gray-200"} last:mb-0`}
    >
      {/* 아이템 상단(이름, 우측 ⋮ 메뉴 아이콘 등) */}
      <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-gray-700">{item.name}</div>
            <button className="text-gray-600 hover:text-gray-800">
            <span> <img className="h-[32px]" src={MoreIcon} /></span>
            </button>
        </div>

      {/* 진행도 바 */}{/* 파일/링크, 날짜, 수정/삭제 아이콘 영역 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="w-[40rem] bg-gray-300 rounded-full h-4 mb-2">
        <div
            className="bg-green-500 h-4"
            style={{ width: `${item.progressPercent}%` }}
            />
        </div>

        <div className="flex items-center">
          <span>{item.fileLink}</span>
        </div>
        <div className="flex items-center gap-10 mr-[50px]">
          <span>{item.updated}</span>
          {/* 수정 아이콘 */}
          <button className="hover:text-gray-700">
          <span> <img className="h-[16px]" src={PencilIcon} /></span>
          </button>
          {/* 삭제 아이콘 */}
          <button className="hover:text-gray-700">
          <span> <img className="h-[16px]" src={DeletIcon} /></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpItemRow;
