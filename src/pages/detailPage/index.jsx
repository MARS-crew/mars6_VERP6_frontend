import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import { useSearchParams } from "react-router-dom";

function DetailPageView() {
  const [searchParams] = useSearchParams();
  const docTitle = searchParams.get("title");
  const docId = searchParams.get("docId");

  useEffect(() => {
    console.log("docId:", docId);
  }, [docId]);

  if (!docId) {
    return <p>잘못된 접근입니다. 문서를 찾을 수 없습니다.</p>;
  }

  const { data, isLoading, error } = useDocumentDetail(docId);

  return <DetailPage data={data} docTitle={docTitle} docId={docId} />;
}

export default DetailPageView;
