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
        const statusCounts = {
          PENDING: 0,
          CHECKED: 0,
          REJECTED: 0,
          APPROVED: 0,
          IN_PROGRESS: 0,
          COMPLETED: 0
        };
        
        response.data.result.forEach(item => {
          if (item.status) {
            statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
          }
        });
        
        // console.log('[Status 별 개수]', statusCounts);
        // console.log('[Status 종류]', Object.keys(statusCounts).filter(key => statusCounts[key] > 0));
        
        response.data.statusCounts = statusCounts;
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
