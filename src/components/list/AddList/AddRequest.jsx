import React from "react";

function AddRequest() {
  return (
    <div className="w-[582px] h-[360px] rounded-lg shadow-lg bg-white mb-[2px] pt-[15px] pl-[27px]">
      <div className="text-xl font-semibold">요청하기</div>
      <div className="mt-[18px]">
        <div className="text-sm font-semibold">업로드할 서류 양식</div>
      </div>
      <div className="mt-[18px]">
        <div className="text-sm font-semibold">파일 업로드</div>
      </div>
      <div className="mt-[18px]">
        <div className="text-sm font-semibold mb-[10px]">작업 내역</div>
        <textarea className="w-[527px] h-[151px] border-[#d9d9d9] rounded-lg border resize-none p-4" />
      </div>
      <button className="bg-[#8E98A8] w-[146px] h-[27px] text-white rounded-[3px] ml-[381px]">
        등록하기
      </button>
    </div>
  );
}

export default AddRequest;
