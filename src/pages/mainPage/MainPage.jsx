import React, { useState } from "react";
import Header from "../../components/header/Header";
import AddDocument from "../../components/Button/AddDocument";
import DocumentList from "../../components/list/DocumentList";

function MainPage() {
  const [documents, setDocuments] = useState([]);

  const handleAddDocument = () => {
    setDocuments(prev => [...prev, Date.now()]);
  };

  return (
    <div className = "bg-[#F6F6F6] w-full min-h-screen">
      <Header />
      <div className = "flex justify-center">
        <div className = "w-[1194px] mt-[30px]">
          {documents.length > 0 ? (
            <>
              <div className = "space-y-[30px] mb-[30px]">
                {documents.map(id => (
                  <DocumentList key = {id} />
                ))}
              </div>
              <AddDocument onClick = {handleAddDocument} />
            </>
          ) : (
            <AddDocument onClick = {handleAddDocument} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
