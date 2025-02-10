import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import useGetDownloadFile from "../../hooks/File/useGetDownloadFile";
import { useSearchParams } from "react-router-dom";

function DetailPageView() {
  const [searchParams] = useSearchParams();
  const docTitle = searchParams.get("title");
  const docId = 254;
  const { data, isLoading, error } = useDocumentDetail(docTitle);
  // const downloadFile = useGetDownloadFile(docId);

  // console.log(downloadFile);
  return <DetailPage data={data} docTitle={docTitle} />;
}

export default DetailPageView;
