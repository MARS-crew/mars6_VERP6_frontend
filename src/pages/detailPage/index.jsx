import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import { useSearchParams } from "react-router-dom";
import useGetDownloadFile from "../../hooks/File/useGetDownloadFile";

function DetailPageView() {
  const [searchParams] = useSearchParams();
  const docTitle = searchParams.get("title");
  const docId = searchParams.get("Id");
  const { data, isLoading, error } = useDocumentDetail(docTitle);

  return <DetailPage data={data} docTitle={docTitle} docId={docId} />;
}

export default DetailPageView;
