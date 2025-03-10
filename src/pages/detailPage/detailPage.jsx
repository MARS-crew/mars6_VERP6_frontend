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
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

function DetailPage({ data, docTitle, docId }) {
  const [addModal, setAddModal] = useState(false);
  const [addRequest, setAddRequest] = useState(false);
  const [filterState, setFilterState] = useState(null); // 상태 필터 추가
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isReversed, setIsReversed] = useState(true);

  const [showAlert, setShowAlert] = useState(false);

  const [filter, setFilter] = useState();
  const position = "leader";
  const requestData = useRequest(docId); // 항상 호출됨

  const auth = useRecoilValue(authState);
  const isTeamLeader = auth.user?.role === "TEAM_LEADER";
  const { request, isLoading, error, createRequestMutation } =
    requestData || {}; // 데이터 없을 때 기본값 설정

  console.log(isTeamLeader);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (!request) return;
    let sortedRequests = [...request];
    if (filterState) {
      sortedRequests = sortedRequests.filter(
        (item) => item.status === filterState
      );
    }
    if (isReversed) {
      sortedRequests.reverse();
    }
    setFilteredRequests(sortedRequests);
  }, [filterState, request, isReversed]); // filterState나 request 변경 시 실행

  const addModalState = () => {
    setAddModal(!addModal);
  };

  const addRequestModal = () => {
    setAddRequest(!addRequest);
  };

  const handleRequestSuccess = () => {
    setAddRequest(false); // 요청 성공 후 모달 닫기
    setShowAlert(true);
  };

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
              </div>
            ) : null}
          </div>
          <VersionListHeader filter={filter} setFilter={setFilter} />
          {addModal ? (
            <AddVersion
              setAddModal={setAddModal}
              addModal={addModal}
              docId={docId}
            />
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
                  />
                ))
            : data &&
              data.data.result
                .slice(0)
                .map((item, index) => (
                  <VersionList
                    key={index}
                    item={item}
                    position={position}
                    index={index}
                  />
                ))}
        </div>
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">작업 요청</p>
            {isTeamLeader ? (
              <p
                onClick={addRequestModal}
                className="font-normal text-sm my-auto text-[#7C838A]"
              >
                요청하기
              </p>
            ) : null}
          </div>
          <RequestListHeader
            filterState={filterState}
            setFilterState={setFilterState}
            isReversed={isReversed}
            setIsReversed={setIsReversed}
          />
          {addRequest ? (
            <AddRequest
              onAddRequest={(requestData) => {
                createRequestMutation.mutate(requestData, {
                  onSuccess: () => {
                    handleRequestSuccess(); // ✅ 요청 성공 후 모달 닫기
                  },
                });
              }}
            />
          ) : null}
          {filteredRequests
            ? filteredRequests.map((item, index) => (
                <RequestList
                  key={index}
                  no={index} // 항목의 번호
                  retitle={item.title} // 파일 이름
                  date={item.createdAt} // 날짜
                  worker={item.assignee} // 작업자
                  content={item.content} // 내용
                  state={item.status} // 상태
                  reqId={item.reqId}
                />
              ))
            : null}
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg left-[50%] right-[35%]">
          요청이 성공적으로 생성되었습니다!
        </div>
      )}
    </div>
  );
}

export default DetailPage;
