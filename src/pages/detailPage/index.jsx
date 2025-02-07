import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";
import useGetDownloadFile from "../../hooks/File/useGetDownloadFile";

function DetailPageView() {
  const docTitle = "새거새거";
  const docId = 254;
  const { data, isLoading, error } = useDocumentDetail(docTitle);
  // const downloadFile = useGetDownloadFile(docId);

  // console.log(downloadFile);
  return <DetailPage data={data} />;
}

export default DetailPageView;
