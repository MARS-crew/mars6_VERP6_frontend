import React, { useEffect, useState } from "react";
import useGetFileUrl from "../../../hooks/File/useGetFileUrl";
import useUploadFile from "../../../hooks/File/useUploadFile";
import { useMutation } from "@tanstack/react-query";


function AddRequest({onAddRequest}) {
  const [file, setFile] = useState("");
  const [kind, setKind] = useState("file");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, error } = useGetFileUrl(null);
  const { uploadFile } = useUploadFile();
  const formData = new FormData();

  const changeFile = (e) => {
    setFile(e.target.files[0].name);
    formData.append("file", e.target.files[0], e.target.files[0].name);
  };

  const changeKind = (e) => {
    setKind(e.target.value);
  };

  useEffect(() => {}, [file]);

  const handleRegister = ()=>{
    if (kind === "file") {
      uploadFile.mutate({
        url: data.data.result.presignedUrl,
        formData,
      });
    }

    onAddRequest({
      filename: kind === "file" ? file : null,
      url: kind === "url" ? url : null,
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
        <div className="text-sm font-semibold mr-[43px]">
          업로드할 서류 양식
        </div>
        <label className="mr-[62px]">
          <input
            className="mr-1"
            type="radio"
            name="kind"
            value="file"
            onChange={changeKind}
          />
          파일 업로드
        </label>
        <label>
          <input
            className="mr-1"
            type="radio"
            name="kind"
            value="url"
            onChange={changeKind}
          />
          주소 업로드
        </label>
      </div>
      {kind == "file" ? (
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
            {/* <div className="mt-[18px] flex">
                  <div className="text-sm font-semibold mr-[83px]">파일 업로드</div>
                  <div className="flex">
                      <input type="file" onChange={changeFile} />
                  </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="mt-[18px] flex">
          <div className="text-sm font-semibold mr-[83px]">주소 업로드</div>
          <input
            className="w-[336px] h-[21px] border-b border-[#d9d9d9] text-xs"
            placeholder="버전 입력"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      )}

      <div className="mt-[18px]">
        <div className="text-sm font-semibold mb-[10px]">작업 내역</div>
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
