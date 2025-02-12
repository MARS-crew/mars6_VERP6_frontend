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
import { useSearchParams } from "react-router-dom";

function DetailPage({ data, docTitle }) {
  const [addModal, setAddModal] = useState(false);
  const [addRequest, setAddRequest] = useState(false);
  const [filterState, setFilterState] = useState(null); // 상태 필터 추가
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [filter, setFilter] = useState();
  const [selectDoc, setSelectDoc] = useState(null);
  const position = "leader";
  const docId = 32;
  const requestData = useRequest(32); // 항상 호출됨
  const { request, isLoading, error, createRequestMutation } = requestData || {}; // 데이터 없을 때 기본값 설정

  useEffect(() => {
    if (!filterState) {
      setFilteredRequests(request); // 필터가 없으면 전체 리스트 반환
    } else {
      const newFilteredRequests = request?.filter((item) => item.status === filterState);
    setFilteredRequests(newFilteredRequests || []);
    }
  }, [filterState, request]); // filterState나 request 변경 시 실행

  const addModalState = () => {
    setAddModal(!addModal);
  };

  const addRequestModal = () => {
    setAddRequest(!addRequest);
  };

  const handleRequestSuccess = () => {
    setAddRequest(false); //요청 성공 시 모달 닫기
  };

  const test=    [{no : 0,
    fileName : "메인페이지 ",
    name : "김도현",
    content : "메인페이지 모달 , 팝업 크기 조절",
    createdAt : "2020.01.01"}]

  return (
    <div className="bg-[#F6F6F6] w-full min-h-screen pb-4">
      <Header />
      <div className="max-w-[1194px] m-auto flex place-content-between">
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">{docTitle}</p>
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
          <VersionListHeader
            position={position}
            filter={filter}
            setFilter={setFilter}
          />
          {addModal ? (
            <AddVersion setAddModal={setAddModal} addModal={addModal} />
          ) : null}
          {filter
            ? data &&
              data.data.result
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <VersionList
                    key={index}
                    item={item}
                    position={position}
                    index={data.data.result.length - 1 - index}
                    setSelectDoc={setSelectDoc}
                  />
                ))
            : data &&
              data.data.result
                .slice(0)
                .map((item, index) => (
                  <VersionList key={index} item={item} position={position} index={index} />
                ))}
        </div>
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">작업 요청</p>
            {position == "leader" ? (
              <p
              onClick={addRequestModal}
              className="font-normal text-sm my-auto text-[#7C838A]"
            >
              요청하기
            </p>
            ) : null }
          </div>
          <RequestListHeader filterState={filterState} setFilterState={setFilterState} />
          {addRequest ? <AddRequest onAddRequest={createRequestMutation.mutate} onSuccess={handleRequestSuccess} /> : null}
          {test ? test?.map((item, index) => (
            <RequestList
              key={index}
              no={index} // 항목의 번호
              filename={item.fileName} // 파일 이름
              date={item.createdAt} // 날짜
              writer={item.name} // 작성자
              content={item.content} // 내용
              state={item.status} // 상태
              reqId={item.reqId}
            />
          )) : null}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
