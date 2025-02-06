import React, { useEffect } from "react";
import DetailPage from "./detailPage";
import useDocumentDetail from "../../hooks/useDocumentDetail";

function DetailPageView() {
  const docTitle = "새거새거";
  const { data, isLoading, error } = useDocumentDetail(docTitle);

  return <DetailPage data={data} />;
}

export default DetailPageView;
