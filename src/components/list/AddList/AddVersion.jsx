import React, { useEffect, useState } from "react";

function AddVersion() {
  const [file, setFile] = useState("");

  const changeFile = (e) => {
    setFile(e.target.files[0].name);
  };

  useEffect(() => {}, [file]);

  return (
    <div className="w-[582px] h-[399px] rounded-lg shadow-lg bg-white mb-[2px] pt-[15px] pl-[27px]">
      <div className="text-xl font-semibold">버전 업그레이드</div>
      <div className="flex mt-[18px]">
        <div className="text-sm font-semibold text-center mr-[122px]">버전</div>
        <input
          className="w-[132px] h-[21px] border-b border-[#d9d9d9] text-xs"
          placeholder="버전 입력"
        />
      </div>
      <div className="mt-[18px] flex text-sm font-semibold">
        <div className="text-sm font-semibold mr-[43px]">
          업로드할 서류 양식
        </div>
        <label className="mr-[62px]">
          <input className="mr-1" type="radio" name="kind" value="file" />
          파일 업로드
        </label>
        <label>
          <input className="mr-1" type="radio" name="kind" value="url" />
          주소 업로드
        </label>
      </div>
      <div className="mt-[18px] flex">
        <div className="text-sm font-semibold mr-[83px]">파일 업로드</div>
        <div class="flex">
          <div className="w-[235px] h-[21px] border border-[#d9d9d9] text-xs flex items-center pl-1">
            {file}
          </div>
          <label
            className="w-[71px] h-[21px] bg-[#d9d9d9] text-xs text-center flex items-center justify-center"
            for="file"
          >
            파일등록
          </label>
          <input
            className="absolute hidden"
            type="file"
            id="file"
            onChange={changeFile}
          />
        </div>
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

export default AddVersion;
