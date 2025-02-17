import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import { useSearchParams } from "react-router-dom";

function DetailPageView() {
  const [searchParams] = useSearchParams();
  const docTitle = searchParams.get("title");
  const docId = searchParams.get("docId");

  const { data, isLoading, error } = useDocumentDetail(docId);

  return <DetailPage data={data} docTitle={docTitle} docId={docId} />;
}

export default DetailPageView;
