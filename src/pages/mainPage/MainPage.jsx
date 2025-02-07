import React from "react";
import Header from "../../components/header/Header";
import AddDocument from "../../components/Button/AddDocument";
import DocumentList from "../../components/list/DocumentList";
import useDocTypes from "../../hooks/useDocTypes";

function MainPage() {
  const { docTypes } = useDocTypes();

  const handleAddDocument = () => {
  };

  return (
    <div className = "bg-[#F6F6F6] w-full min-h-screen">
      <Header />
      <div className = "flex justify-center">
        <div className = "w-[1194px]">
          <div className = "space-y-[30px] mt-[30px] mb-[30px]">
            {docTypes.map(docType => (
              <DocumentList
                key={docType.id}
                id={docType.id}
                initialTitle={docType.name}
              />
            ))}
          </div>
          <AddDocument onClick = {handleAddDocument} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;