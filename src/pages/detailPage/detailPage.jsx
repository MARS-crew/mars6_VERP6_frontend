import React from "react";
import Header from "../../components/header/Header";
import VersionList from "../../components/list/VersionList/VersionList";
import VersionListHeader from "../../components/list/VersionList/VersionListHeader";
import RequestListHeader from "../../components/list/RequestList/RequestListHeader";
import RequestList from "../../components/list/RequestList/RequestList";

function DetailPage() {
  return (
    <div className="bg-[#F6F6F6] w-full h-screen">
      <Header />
      <div className="max-w-[1194px] m-auto flex place-content-between">
        <div className="mt-[30px]">
          <p className="font-bold text-xl mb-[30px]">Todo list 앱 기획서</p>
          <VersionListHeader />
          <VersionList />
        </div>
        <div className="mt-[30px]">
          <div className="flex place-content-between mb-[30px]">
            <p className="font-bold text-xl">Todo list 앱 기획서</p>
            <p className="font-normal text-sm my-auto text-[#7C838A]">
              요청하기
            </p>
          </div>
          <RequestListHeader />
          <RequestList />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
