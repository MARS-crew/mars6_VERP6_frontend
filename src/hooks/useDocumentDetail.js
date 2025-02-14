import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useDocumentDetail(docId) {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getDocumentDetail", docId],
    queryFn: async () => {
      const response = await axios.get(`/api/docs-detail/${docId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.result) {
        const statusCounts = {};
        response.data.result.forEach(item => {
          const status = item.status;
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        
        console.log('Status 별 개수:', statusCounts);
        console.log('Status 종류:', Object.keys(statusCounts));
      }

      return response;
    },
    retry: 1,
  });

  const createDocumentDetail = useMutation({
    mutationFn: async ({
      docId,
      uploadFileUrl,
      fileName,
      externalUrl,
      data,
    }) => {
      if (!docId) {
        return;
      }
      const response = await axios.post(`/api/docs-detail/${docId}`, data, {
        params: {
          docId: docId,
          externalUrl: externalUrl,
          uploadFileUrl: uploadFileUrl,
          fileName: fileName,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDocumentDetail"]);
    },
  });

  return {
    data,
    isLoading,
    error,
    createDocumentDetail,
  };
}

export default useDocumentDetail;
