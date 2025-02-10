import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import VersionList from "../../components/list/VersionList/VersionList";
import VersionListHeader from "../../components/list/VersionList/VersionListHeader";
import RequestListHeader from "../../components/list/RequestList/RequestListHeader";
import RequestList from "../../components/list/RequestList/RequestList";
import trashIcon from "../../assets/svg/Trash.svg";
import editIcon from "../../assets/svg/Edit.svg";
import AddVersion from "../../components/list/AddList/AddVersion";
import AddRequest from "../../components/list/AddList/AddRequest";
import { useRequest } from "../../hooks/uesRequestList";

function DetailPage({ data }) {
  const [addModal, setAddModal] = useState(false);
  const [addRequest, setAddRequest] = useState(false);
  const position = "leader";
  const docId = 32;
  const { request, isLoading, error, createRequestMutation } =
    useRequest(docId); // useRequest 사용

  console.log("request : ", request);
  const addModalState = () => {
    setAddModal(!addModal);
  };

  const addRequestModal = () => {
    setAddRequest(!addRequest);
  };

  const handleRequestSuccess = () => {
    setAddRequest(false); //요청 성공 시 모달 닫기
  };

  return (
    <div className="bg-[#F6F6F6] w-full h-screen">
      <Header />
      <div className="max-w-[1194px] m-auto flex place-content-between">
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">Todo list 앱 기획서</p>
            {position == "leader" ? (
              <div className="flex">
                <p
                  onClick={addModalState}
                  className="text-center text-[#7C838A]"
                >
                  +
                </p>
                <img className="w-6 ml-[15px]" src={editIcon} />
                <img className="w-6 ml-[11px]" src={trashIcon} />
              </div>
            ) : null}
          </div>
          <VersionListHeader position={position} />
          {addModal ? (
            <AddVersion setAddModal={setAddModal} addModal={addModal} />
          ) : null}
          {data &&
            data.data.result
              .slice(0)
              .reverse()
              .map((item, index) => (
                <VersionList
                  item={item}
                  position={position}
                  index={data.data.result.length - 1 - index}
                />
              ))}
        </div>
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">Todo list 앱 기획서</p>
            <p
              onClick={addRequestModal}
              className="font-normal text-sm my-auto text-[#7C838A]"
            >
              요청하기
            </p>
          </div>
          <RequestListHeader />
          {addRequest ? (
            <AddRequest
              onAddRequest={createRequestMutation.mutate}
              onSuccess={handleRequestSuccess}
            />
          ) : null}
          {request &&
            request.map((item, index) => (
              <RequestList
                key={index}
                no={index} // 항목의 번호
                filename={item.fileName} // 파일 이름
                date={item.createdAt} // 날짜
                writer={item.name} // 작성자
                content={item.content} // 내용
                state={item.status} // 상태
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
