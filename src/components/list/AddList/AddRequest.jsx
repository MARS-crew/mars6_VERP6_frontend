import React, { useEffect, useState } from "react";


function AddRequest({onAddRequest}) {
  const [person, setPerson] = useState("");
  const [requestTilte, setrequestTilte] = useState("");
  const [content, setContent] = useState("");


  const handleRegister = ()=>{

    onAddRequest({
      person,
      requestTilte,
      content,
    });
    if (onSuccess) {
      onSuccess(); //요청 성공 후 모달 닫기
    }
  }

  return (
    <div className="w-[582px] h-[400px] rounded-lg shadow-lg bg-white mb-[2px] pt-[15px] pl-[27px]">
      <div className="text-xl font-semibold">요청하기</div>
      <div className="mt-[18px] flex text-sm font-semibold">
        <div className="text-sm font-semibold mr-[43px] w-[140px]">
          담당자 이름
        </div>
        <input 
          className="w-[132px] border-2 border-b-gray-200 border-t-white border-l-white border-r-white" 
          placeholder="이름 입력" 
          onChange={(e) => setPerson(e.target.value)}
        />
      </div>
      <div className="mt-[18px] flex text-sm font-semibold">
        <div className="text-sm font-semibold mr-[43px] w-[140px]">
          요청 제목
        </div>
        <input 
          className="w-[266px] border-2 border-b-gray-200 border-t-white border-l-white border-r-white" 
          placeholder="요청 제목을 입력해 주세요"  
          onChange={(e) => setrequestTilte(e.target.value)}
        />
      </div>
      <div className="mt-[18px]">
        <div className="text-sm font-semibold mb-[10px]">요청 사항</div>
        <textarea className="w-[527px] h-[151px] border-[#d9d9d9] rounded-lg border resize-none p-4" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="bg-[#8E98A8] w-[146px] h-[27px] text-white rounded-[3px] ml-[381px]"
        onClick={handleRegister}
      >
        등록하기
      </button>
    </div>
  );
}

export default AddRequest;
