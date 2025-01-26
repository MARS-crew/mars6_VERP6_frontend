import React from "react";
import ItemRow from "./ItemRow";
import AlertIcon from "../../../assets/images/icon-alert.png"



function PaperList({ section }){
    console.log("값 :", section);
    return (
        <div className="bg-white rounded-lg shadow p-4 w-[1194px]">
          {/* 섹션(카드) 제목 */}
          <h2 className="text-xl font-semibold mb-4 flex items-center">{section.title} { section.items.state ? <img className="ml-[10px] h-[20px]" src={AlertIcon} /> : null}</h2>
    
          {/* 섹션 내 아이템들 */}
          {section.items.map((item, idx) => (
            <ItemRow key={idx} item={item} isLast={idx === section.items.length - 1} />
          ))}
        </div>
      );
}

export default PaperList;