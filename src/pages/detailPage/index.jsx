import React, { useEffect } from "react";
import DetailPage from "./DetailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";

function DetailPageView() {
  const docTitle = "새거새거";
  const { data, isLoading, error } = useDocumentDetail(docTitle);
  console.log(data.data.result);

  return <DetailPage data={data.data.result} />;
}

export default DetailPageView;
