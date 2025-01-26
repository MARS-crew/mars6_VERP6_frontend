// App.js
import React, { useState } from "react";
import Header from "../../components/header/Header";
import PaperList from "../../components/list/PaperList/PaperList";
import AddDocument from "../../components/Button/AddDocument";

function TestMain() {
  const [documents, setDocuments] = useState([]);

    const handleAddDocument = () => {
        setDocuments(prev => [...prev, Date.now()]);
      };
  // 예시 데이터
  const sections = [
    {
      title: "기획서",
      items: [
        {
          name: "Todo list 앱 기획서",
          fileLink: "V0.2 todo 기획서.ppt",
          progressPercent: 60,
          updated: "1일전",
          state:true
        },
        {
          name: "Todo list 웹 기획서",
          fileLink: "V0.2 todo 기획서.ppt",
          progressPercent: 70,
          updated: "1일전",
          state:false
        },
      ],
    },
    {
      title: "디자인",
      items: [
        {
          name: "Todo list 다크 모드",
          fileLink: "https://www.figma.co..",
          progressPercent: 50,
          updated: "1일전",
        },
        {
          name: "Todo list 기본 모드",
          fileLink: "https://www.figma.co..",
          progressPercent: 80,
          updated: "1일전",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F6F6F6] w-full min-h-screen">
      <Header />

      <div className="flex justify-center">
        <div className="space-y-[30px] mt-[30px] mb-[30px]">
            {sections.map((section, index) => (
            <PaperList key={index} section={section} />
            ))}

            {/* 하단 + 버튼(추가) */}
            <div className="flex justify-center">
            <AddDocument onClick = {handleAddDocument} />
            </div>
        </div>
      </div>
    </div>
  );
}

export default TestMain;
