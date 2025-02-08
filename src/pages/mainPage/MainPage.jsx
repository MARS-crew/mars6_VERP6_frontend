import React, { useState } from "react";
import Header from "../../components/header/Header";
import AddDocument from "../../components/Button/AddDocument";
import DocumentList from "../../components/list/DocumentList";
import useDocTypes from "../../hooks/useDocTypes";

function MainPage() {
  const [documents, setDocuments] = useState([]);
  const { docTypes } = useDocTypes();

  React.useEffect(() => {
    const handleDocTypeCreated = (event) => {
      setDocuments([]);
    };

    window.addEventListener('docTypeCreated', handleDocTypeCreated);
    return () => {
      window.removeEventListener('docTypeCreated', handleDocTypeCreated);
    };
  }, []);

  const handleAddDocument = () => {
    if (documents.length === 0) {
      setDocuments([Date.now()]);
    }
  };

  const handleRemoveDocument = (id) => {
    setDocuments([]);
  };

  return (
    <div className = "bg-[#F6F6F6] w-full min-h-screen">
      <Header />
      <div className = "flex justify-center">
        <div className = "w-[1194px]">
          <div className = "space-y-[30px] mt-[30px] mb-[30px]">
            {docTypes.map((docType) => (
              <DocumentList
                key={`doctype-${docType.id}`}
                id={docType.id}
                initialTitle={docType.name}
              />
            ))}
            {documents.map((id) => (
              <DocumentList
                key={id}
                id={id}
                isNew={true}
                onRemove={handleRemoveDocument}
              />
            ))}
          </div>

          <AddDocument onClick={handleAddDocument} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
