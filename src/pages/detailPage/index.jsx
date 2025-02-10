import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import { useSearchParams } from "react-router-dom";

function DetailPageView() {
  const [searchParams] = useSearchParams();
  const docTitle = searchParams.get("title");
  const docId = 254;
  const { data, isLoading, error } = useDocumentDetail(docTitle);

  return <DetailPage data={data} docTitle={docTitle} />;
}

export default DetailPageView;
