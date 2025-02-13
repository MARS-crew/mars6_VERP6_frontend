import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useDocumentDetail from "../../../hooks/useDocumentDetail";
import useUploadFile from "../../../hooks/File/useUploadFile";
import useGetFileUrl from "../../../hooks/File/useGetFileUrl";

function AddVersion({ setAddModal, addModal }) {
  const [fileName, setFileName] = useState("");
  const [kind, setKind] = useState("file");
  const [version, setVersion] = useState();
  const [url, setUrl] = useState();
  const [contents, setContents] = useState();
  const formData = new FormData();

  const { createDocumentDetail } = useDocumentDetail(null);
  const { data, isLoading, error } = useGetFileUrl(null);
  const { uploadFile } = useUploadFile();

  const changeFile = (e) => {
    setFileName(e.target.files[0].name);
    formData.append("file", e.target.files[0], e.target.files[0].name);
    console.log(e.target.files[0]);
  };

  const changeKind = (e) => {
    setKind(e.target.value);
  };

  const handleVersion = (e) => {
    setVersion(e.target.value);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const changeURL = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (kind === "file") {
      uploadFile.mutate({
        url: data.data.result.presignedUrl,
        formData,
      });
    }

    createDocumentDetail.mutate({
      docId: 387,
      externalUrl: url == null ? null : url,
      originalFileName: fileName == null ? null : fileName,
      data: {
        content: contents,
        version: version,
      },
    });

    setAddModal(!addModal);
  };

  return (
    <div className="w-[582px] h-[399px] rounded-lg shadow-lg bg-white mb-[2px] pt-[15px] pl-[27px]">
      <div className="text-xl font-semibold">버전 업그레이드</div>
      <div className="flex mt-[18px]">
        <div className="text-sm font-semibold text-center mr-[122px]">버전</div>
        <input
          className="w-[132px] h-[21px] border-b border-[#d9d9d9] text-xs"
          placeholder="버전 입력"
          id="version"
          onChange={handleVersion}
        />
      </div>
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
              {fileName}
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
      ) : (
        <div className="mt-[18px] flex">
          <div className="text-sm font-semibold mr-[83px]">주소 업로드</div>
          <input
            className="w-[336px] h-[21px] border-b border-[#d9d9d9] text-xs"
            placeholder="주소 입력"
            onChange={changeURL}
          />
        </div>
      )}

      <div className="mt-[18px]">
        <div className="text-sm font-semibold mb-[10px]">작업 내역</div>
        <textarea
          className="w-[527px] h-[151px] border-[#d9d9d9] rounded-lg border resize-none p-4"
          onChange={changeContents}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#8E98A8] w-[146px] h-[27px] text-white rounded-[3px] ml-[381px]"
      >
        등록하기
      </button>
    </div>
  );
}

export default AddVersion;
